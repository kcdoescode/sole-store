"use client";

import { useWishlist } from "@/lib/wishlist-store";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState, Suspense } from "react";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import { Heart } from "lucide-react";
import { getProductsByIds } from "@/app/actions";

function WishlistContent() {
  const { items: wishlistIds } = useWishlist();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlistIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      
      try {
        const data = await getProductsByIds(wishlistIds);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load wishlist", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [wishlistIds]);

  return (
    <main className="min-h-screen bg-white text-black flex flex-col">
      <AnnouncementBar />
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
          <Heart className="w-8 h-8 fill-black" />
          Your Wishlist
        </h1>

        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-100 rounded-2xl mb-4" />
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-1/4" />
               </div>
             ))}
           </div>
        ) : products.length === 0 ? (
           <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-bold text-gray-900">Your wishlist is empty.</h2>
              <p className="text-gray-500 mt-2">Save items you love to come back to later.</p>
              <a href="/" className="inline-block mt-6 bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition">
                Start Shopping
              </a>
           </div>
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {products.map((product) => {
                 const mainImage = product.images?.[0] || "https://via.placeholder.com/300";
                 
                 return (
                   <ProductCard 
                     key={product.id} 
                     product={{
                        ...product,
                        mainImage: mainImage, 
                     }} 
                   />
                 );
             })}
           </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

export default function WishlistPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <WishlistContent />
    </Suspense>
  );
}