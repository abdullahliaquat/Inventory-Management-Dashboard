"use client";

import { useState } from "react";
import { Trash2, Minus, Plus, AlertTriangle } from "lucide-react";
import type { Product, UpdateStock } from "../types";

interface ProductCardProps {
  product: Product;
  onUpdateStock: (payload: UpdateStock) => void;
  onDelete: (productid: string) => void;
}

export function ProductCard({
  product,
  onUpdateStock,
  onDelete,
}: ProductCardProps) {
  const [localStock, setLocalStock] = useState(product.currentStock);

  const islowstock = localStock < 10;
  const iscritical = localStock == 0;

  const handleIncrease = () => {
    const newstock = localStock + 1;
    setLocalStock(newstock);

    onUpdateStock({ productid: product.id, quantity: newstock });
  };

  const handleDecrease = () => {
    const newstock = localStock - 1;
    setLocalStock(newstock);
    onUpdateStock({ productid: product.id, quantity: newstock });
  };

  return (
    <div
      className={`bg-card border rounded-lg p-4 flex flex-col gap-3 hover:border-yellow-500 transition-colors relative ${
        iscritical
          ? "border-red-600 bg-red-950/30"
          : islowstock
          ? "border-amber-500/30 bg-amber-500/10"
          : "border-border"
      }`}
    >
      {iscritical && (
        <div className="absolute -top-2 -right-2 bg-red-700 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {" "}
          !{" "}
        </div>
      )}
      {islowstock && (
        <div className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {" "}
          !{" "}
        </div>
      )}

      <div className="flex-1 pr-6">
        <p className="flex text-xs font-mono text-muted-foreground uppercase tracking-wide">
          SKU: {product.sku}
        </p>
        <h3 className="flex text-lg font-semibold text-yellow-500 mt-1 truncate">
          {product.name}{" "}
        </h3>
      </div>

      <div
        className={`rounded p-3 border ${
          iscritical
            ? "bg-red-950/80 border-red-600"
            : islowstock
            ? "bg-amber-500/15 border-amber-500/30"
            : "bg-primary/10 border-primary/20"
        }`}
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sx text-muted-foreground uppercase tracking-wide mb-1">
              Current Stock
            </p>
            <p
              className={`flex text-3xl font-bold font-sans ${
                iscritical
                  ? "text-red-500"
                  : islowstock
                  ? "text-amber-600"
                  : "text-yellow-500"
              }`}
            >
              {localStock}
            </p>
          </div>
          {iscritical && (
            <AlertTriangle className="w-5 h-5 text-red-500 mb-1" />
          )}
          {islowstock && !iscritical && (
            <AlertTriangle className="w-5 h-5 text-amber-600 mb-1" />
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleDecrease}
          disabled={localStock === 0}
          className="flex-1 bg-red-950 hover:bg-red-900 text-accent-foreground rounded px-3 py-2 font-semibold transition-colors flex items-center justify-center gap-1"
        >
          <Minus className="w-4 h-4" />
          <span className="hidden sm:inline">Decrease</span>
        </button>

        <button
          onClick={handleIncrease}
          className="flex-1 bg-yellow-800 hover:bg-yellow-700 text-accent-foreground rounded px-3 py-2 font-semibold transition-colors flex items-center justify-center gap-1"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Increase</span>
        </button>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(product.id)}
        className="w-full bg-red-800/30 hover:bg-red-700/50 text-accent-foreground rounded px-3 py-2 font-semibold transition-colors flex items-center justify-center gap-2 text-sm"
      >
        <Trash2 className="w-4 h-4" />
        Delete Product
      </button>
    </div>
  );
}

export default ProductCard;
