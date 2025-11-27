"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useCart } from "@/lib/store";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  sizes: string[];
}

interface Props {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickAddModal({ product, isOpen, onClose }: Props) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const addItem = useCart((state) => state.addItem);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    if (!selectedSize) return; // Don't add if no size selected

    const cartItemName = `${product.name} (${selectedSize})`;
    
    addItem({
      id: product.id, // unique ID for size variants
      name: cartItemName,
      price: product.price,
      image: product.image,
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex gap-4">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
            <p className="text-gray-600">${(product.price / 100).toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="mb-3 text-sm font-medium text-gray-900">Select Size</h4>
          {product.sizes.length > 0 ? (
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-md border py-2 text-sm font-medium transition ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          ) : (
             <p className="text-sm text-gray-500">One Size</p>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!selectedSize && product.sizes.length > 0}
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}