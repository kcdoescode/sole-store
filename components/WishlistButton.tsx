"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist-store";
import { useEffect, useState } from "react";

interface WishlistButtonProps {
  productId: string;
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const { hasItem, addItem, removeItem } = useWishlist();
  const [isLiked, setIsLiked] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsLiked(hasItem(productId));
  }, [productId, hasItem]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (isLiked) {
      removeItem(productId);
      setIsLiked(false);
    } else {
      addItem(productId);
      setIsLiked(true);
    }
  };

  if (!isClient) return <div className="w-5 h-5" />; 

  return (
    <button
      onClick={toggleWishlist}
      className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition shadow-sm group"
    >
      <Heart
        className={`w-5 h-5 transition-colors ${
          isLiked ? "fill-red-500 text-red-500" : "text-gray-600 group-hover:text-black"
        }`}
      />
    </button>
  );
}