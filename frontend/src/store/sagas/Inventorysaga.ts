import { call, put, takeEvery } from "redux-saga/effects";
import * as actions from "../slices/Inventoryslices";
import type { CreateProduct, UpdateStock } from "../../types";

const API_BASE = "http://localhost:5000/api/products";

function* fetchProductsSaga():Generator {
  try {
    const response: Response = yield call(fetch, API_BASE);
    const data = yield call([response, response.json]);
    const normalized = data.map((p: any) => ({ ...p, id: p._id }));
    yield put(actions.fetchProductsSuccess(normalized));
  } catch (error: any) {
    yield put(actions.fetchProductsFailure("Failed to fetch products"));
  }
}

function* createProductSaga(action: { payload: CreateProduct }):Generator {
  try {
    const response: Response = yield call(fetch, API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action.payload),
    });

    const data = yield call([response, response.json]);
    yield put(actions.createProductSuccess(data));
  } catch (error) {
    yield put(actions.createProductFailure("Failed to create product"));
  }
}

function* updateStockSaga(action: { payload: UpdateStock, type:String }):Generator {
  try {
    const response: Response = yield call(
      fetch,
      `${API_BASE}/${action.payload.productid}/stock`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentStock: action.payload.quantity }),
      }
    );

    const data = yield call([response, response.json]);
    yield put(actions.updateStockSuccess(data));
  } catch (error: any) {
    yield put(
      actions.updateStockFailure({
        productId: action.payload.productid,
        error: "Failed to update stock",
      })
    );
  }
}

function* deleteProductSaga(action: { payload: string }) {
  try {
    yield call(fetch, `${API_BASE}/${action.payload}`, {
      method: "DELETE",
    });

    yield put(actions.deleteProductSuccess(action.payload));
  } catch (error: any) {
    yield put(
      actions.deleteProductFailure({
        productId: action.payload,
        error: "Failed to delete product",
      })
    );
  }
}

export function* inventorySaga() {
  yield takeEvery(actions.fetchProductsRequest.type, fetchProductsSaga);
  yield takeEvery(actions.createProductRequest, createProductSaga);
  yield takeEvery(actions.updateStockRequest, updateStockSaga);
  yield takeEvery(actions.deleteProductRequest, deleteProductSaga);
}
