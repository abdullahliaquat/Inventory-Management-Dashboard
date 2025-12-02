import React, { useState } from "react";
import type { CreateProduct } from "../types";
import { X } from "lucide-react";

interface AddProductModalProp {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateProduct) => void;
}

const AddProduct = ({ isOpen, onClose, onSubmit }: AddProductModalProp) => {
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    currentStock: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateform = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.sku.trim()) newErrors.sku = "Sku is required.";
    if (!formData.name.trim()) newErrors.name = "Name is required.";

    if (!formData.currentStock.trim()) {
      newErrors.currentStock = "Stock quantity is required.";
    } else if (isNaN(Number(formData.currentStock))) {
      newErrors.currentStock = "Stock must be a number.";
    } else if (Number(formData.currentStock) < 0) {
      newErrors.currentStock = "Stock cannot be negative.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateform()) return;

    onSubmit({
      sku: formData.sku.trim(),
      name: formData.name.trim(),
      currentStock: Number(formData.currentStock),
    });

    // Clear
    setFormData({ sku: "", name: "", currentStock: "" });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card bg-black border border-border rounded-lg w-full max-w-sm p-6 max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-card-foreground">Add Product</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-card-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* SKU */}
          <div>
            <label className="flex text-sm font-semibold text-card-foreground mb-1">SKU</label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => {
                setFormData({ ...formData, sku: e.target.value });
                setErrors({ ...errors, sku: "" });
              }}
              className="w-full bg-input border border-border rounded px-3 py-2"
            />
            {errors.sku && <p className="text-destructive text-xs mt-1">{errors.sku}</p>}
          </div>

          {/* NAME */}
          <div>
            <label className="flex text-sm font-semibold text-card-foreground mb-1">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setErrors({ ...errors, name: "" });
              }}
              className="w-full bg-input border border-border rounded px-3 py-2"
            />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
          </div>

          {/* STOCK */}
          <div>
            <label className="flex text-sm font-semibold text-card-foreground mb-1">Initial Stock</label>
            <input
              type="number"
              min="0"
              value={formData.currentStock}
              onChange={(e) => {
                setFormData({ ...formData, currentStock: e.target.value });
                setErrors({ ...errors, currentStock: "" });
              }}
              className="w-full bg-input border border-border rounded px-3 py-2"
            />
            {errors.currentStock && (
              <p className="text-destructive text-xs mt-1">{errors.currentStock}</p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-red-900 hover:bg-red-800 text-muted-foreground rounded px-4 py-2 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-yellow-700 hover:bg-yellow-600 text-white rounded px-4 py-2 font-semibold"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
