export interface Product {
  id: string;
  sku: string;
  name: string;
  currentStock: number;
}

export interface UpdateStock {
  productid: string;
  quantity: number;
}

export interface CreateProduct {
  sku: string;
  name: string;
  currentStock: number;
}

export interface DeleteProduct{
  productId: string
}

export interface InventoryState {
  products: Product[]
  loading: boolean
  updating: Record<string, boolean>
  error: string | null
  success: string | null
}