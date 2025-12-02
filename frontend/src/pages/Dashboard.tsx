"use client";

import { useEffect, useState } from "react";
import {
  Package,
  AlertCircle,
  CheckCircle,
  TrendingDown,
  BarChart3,
  Archive,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import type { UpdateStock, CreateProduct } from "../types";
import AddProduct from "../components/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import * as inventoryActions from "../store/slices/Inventoryslices";

export function Dashboard() {
  const dispatch = useDispatch();
  const { products, loading, error, success } = useSelector(
    (state: RootState) => state.inventory
  );
  const [isformOpen, setformOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(inventoryActions.fetchProductsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => {
      dispatch(inventoryActions.clearMessages());
    }, 5000);
    return () => clearTimeout(timer);
  }, [error, dispatch]);

  const handleaddProduct = (payload: CreateProduct) => {
    dispatch(inventoryActions.createProductRequest(payload));
    setformOpen(false);
  };

  const handleUpdateStock = (payload: UpdateStock) => {
    dispatch(inventoryActions.updateStockRequest(payload));
  };

  const handleDelete = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      dispatch(inventoryActions.deleteProductRequest(productId));
    }
  };

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.currentStock, 0);
  const lowStockProducts = products.filter((p) => p.currentStock < 10);
  const criticalStockProducts = products.filter((p) => p.currentStock === 0);

  const filteredProducts = products.filter(
    (p) =>
      (p.sku?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
      (p.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Inventory Tracker
            </h1>
          </div>
          <p className="flex text-white">
            Real-time warehouse inventory management system
          </p>
        </div>

        {error && (
          <div className="mb-4 border rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-4 bg-accent/10 border border-accent/30 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-accent-foreground text-sm">{success}</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4 border-yellow-400">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-mono text-orange-200 uppercase tracking-wide mb-1">
                    Total Products
                  </p>
                  <p className="text-3xl font-bold text-orange-600">
                    {totalProducts}
                  </p>
                </div>
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-xs text-orange-200">
                Active items in warehouse
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 border-yellow-400">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-mono text-yellow-100 uppercase tracking-wide mb-1">
                    Total Stock
                  </p>
                  <p className="text-3xl font-bold text-primary text-yellow-400">
                    {totalStock}
                  </p>
                </div>
                <BarChart3 className="w-6 h-6 text-accent/60 text-yellow-400" />
              </div>
              <p className="text-xs text-yellow-100">
                Units across all products
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 border-amber-500/30 bg-amber-500/5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-mono text-amber-600 uppercase tracking-wide mb-1">
                    Low Stock
                  </p>
                  <p className="text-3xl font-bold text-amber-600">
                    {lowStockProducts.length}
                  </p>
                </div>
                <TrendingDown className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-xs text-amber-600">Items below 10 units</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 border-red-600 bg-red-950/30">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-mono text-red-400 uppercase tracking-wide mb-1">
                    Out of Stock
                  </p>
                  <p className="text-3xl font-bold text-red-500">
                    {criticalStockProducts.length}
                  </p>
                </div>
                <Archive className="w-6 h-6 text-red-400" />
              </div>
              <p className="text-xs text-red-400">Items at zero units</p>
            </div>
          </div>
        )}

        {!loading && lowStockProducts.length > 0 && (
          <div className="mb-8 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <TrendingDown className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-amber-600 mb-2">
                  Low Stock Alerts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {lowStockProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white/75 rounded px-3 py-2 flex items-center justify-between text-sm"
                    >
                      <div>
                        <p className="font-mono text-xs text-amber-900">
                          {product.sku}
                        </p>
                        <p className="text-amber-900 truncate">
                          {product.name}
                        </p>
                      </div>
                      <div className="bg-amber-600 text-white rounded px-2 py-1 font-semibold text-center min-w-12">
                        {product.currentStock}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {criticalStockProducts.length > 0 && (
          <div className="mb-8 bg-red-950/30 border border-red-600 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-500 mb-2">
                  Out of Stock
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {criticalStockProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white/75 rounded px-3 py-2 flex items-center justify-between text-sm"
                    >
                      <div>
                        <p className="font-mono text-xs text-red-900">
                          {product.sku}
                        </p>
                        <p className="text-red-900 truncate">{product.name}</p>
                      </div>
                      <div className="bg-red-700 text-white rounded px-2 py-1 font-semibold text-center min-w-12">
                        {product.currentStock}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by SKU or product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            onClick={() => setformOpen(true)}
            className="bg-primary hover:bg-amber-400 bg-amber-500 text-primary-foreground rounded-lg px-6 py-3 font-semibold transition-colors whitespace-nowrap"
          >
            + Add Product
          </button>
        </div>

        {!loading && products.length === 0 && (
          <div className="border border-dashed border-border rounded-lg p-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No products yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Get started by adding your first product to the inventory.
            </p>
            <button
              onClick={() => setformOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2 font-semibold transition-colors"
            >
              Add First Product
            </button>
          </div>
        )}

        {!loading && filteredProducts.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="flex text-lg font-bold text-foreground mb-1">
                Inventory List
              </h2>
              <p className="flex text-sm text-muted-foreground">
                {filteredProducts.length} of {totalProducts} products
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onUpdateStock={handleUpdateStock}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && filteredProducts.length === 0 && products.length > 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No products match your search.
            </p>
          </div>
        )}
      </div>
      <AddProduct
        isOpen={isformOpen}
        onClose={() => setformOpen(false)}
        onSubmit={handleaddProduct}
      />
    </div>
  );
}

export default Dashboard;
