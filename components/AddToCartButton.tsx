"use client";

import { useCart, CartItem } from "@/lib/store";
import { ShoppingBag } from "lucide-react";

interface Props {
  product: Omit<CartItem, 'quantity'>; 
  compact?: boolean;
}

export default function AddToCartButton({ product, compact }: Props) {
  const addItem = useCart((state) => state.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    e.preventDefault();
    
    addItem(product);
    
    console.log("✅ Added to cart:", product.name);
    alert("Added to cart!");
  };

  if (compact) {
    return (
      <button
        onClick={handleAdd}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Add
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="flex-1 flex items-center justify-center gap-3 rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-95"
    >
      <ShoppingBag className="w-5 h-5" />
      Add to Cart
    </button>
  );
}