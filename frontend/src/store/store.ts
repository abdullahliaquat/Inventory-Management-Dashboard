import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import InventoryReducer from "./slices/Inventoryslices";
import { inventorySaga } from "./sagas/Inventorysaga";
const SagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    inventory: InventoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(SagaMiddleware),
});

SagaMiddleware.run(inventorySaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
