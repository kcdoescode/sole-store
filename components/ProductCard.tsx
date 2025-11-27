"use client";

import { useState } from "react";
import Link from "next/link";
import QuickAddModal from "./QuickAddModal";
import { ShoppingBag } from "lucide-react";
import WishlistButton from "./WishlistButton"; 

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mainImage: string; 
  sizes: string[];
  brand?: string | null;
}

export default function ProductCard({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md flex flex-col h-full transition-all duration-300">
        
        <Link href={`/product/${product.id}`} className="block aspect-square w-full overflow-hidden bg-gray-100 cursor-pointer relative">
          
          <div className="absolute top-3 right-3 z-10">
             <WishlistButton productId={product.id} />
          </div>

          <img
            src={product.mainImage}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="p-4 flex flex-col grow">
          <Link href={`/product/${product.id}`} className="cursor-pointer">
            <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition line-clamp-1">
                {product.name}
            </h3>
          </Link>
          
          <p className="mt-1 text-sm text-gray-500 line-clamp-2 mb-4">
            {product.description}
          </p>
          
          {product.brand && (
              <span className="mb-auto inline-block w-fit rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600 uppercase tracking-wide">
                  {product.brand}
              </span>
          )}
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ${(product.price / 100).toFixed(2)}
            </span>
            
            <button 
                onClick={(e) => {
                    e.preventDefault(); // Prevent link navigation
                    e.stopPropagation();
                    setIsModalOpen(true);
                }}
                className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 flex items-center gap-2 shadow-sm active:scale-95"
            >
                <ShoppingBag className="w-4 h-4" />
                Add
            </button>
          </div>
        </div>
      </div>

      <QuickAddModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={{
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.mainImage,
            sizes: product.sizes
        }}
      />
    </>
  );
}