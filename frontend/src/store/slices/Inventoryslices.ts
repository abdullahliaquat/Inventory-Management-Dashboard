import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  InventoryState,
  Product,
  UpdateStock,
  CreateProduct,
} from "../../types";

const initialState: InventoryState = {
  products: [],
  loading: false,
  updating: {},
  error: null,
  success: null,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    createProductRequest: (state, action: PayloadAction<CreateProduct>) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    createProductSuccess: (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.products.push({
        id: action.payload.id,
        sku: action.payload.sku,
        name: action.payload.name,
        currentStock: action.payload.currentStock,
      });
      state.success = "Product created successfully";
    },
    createProductFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateStockRequest: (state, action: PayloadAction<UpdateStock>) => {
      state.updating = { ...state.updating, [action.payload.productid]: true };
      state.error = null;
      const index = state.products.findIndex(
        (p) => p.id === action.payload.productid
      );
      if (index !== -1) {
        state.products[index].currentStock = action.payload.quantity;
      }
    },
    updateStockSuccess: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        state.updating = { ...state.updating, [action.payload.id]: false };
      }
    },
    updateStockFailure: (
      state,
      action: PayloadAction<{ productId: string; error: string }>
    ) => {
      state.updating = { ...state.updating, [action.payload.productId]: false };
      state.error = action.payload.error;
    },

    deleteProductRequest: (state, action: PayloadAction<string>) => {
      state.updating = { ...state.updating, [action.payload]: true };
      state.error = null;
    },
    deleteProductSuccess: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      state.updating = { ...state.updating, [action.payload]: false };
      state.success = "Product deleted successfully";
    },
    deleteProductFailure: (
      state,
      action: PayloadAction<{ productId: string; error: string }>
    ) => {
      state.updating = { ...state.updating, [action.payload.productId]: false };
      state.error = action.payload.error;
    },

    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  updateStockRequest,
  updateStockSuccess,
  updateStockFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  clearMessages,
} = inventorySlice.actions;

export default inventorySlice.reducer;
