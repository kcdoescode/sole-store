"use client";

import Link from "next/link";
import { UserButton, SignInButton, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { Search, ShoppingBag, Heart } from "lucide-react"; // Import Heart
import CartDrawer from "./CartDrawer";
import MobileMenu from "./MobileMenu";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useWishlist } from "@/lib/wishlist-store";

export default function Navbar() {
  const { userId } = useAuth();
  const isAdmin = userId === process.env.NEXT_PUBLIC_ADMIN_ID;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") || "");

  // Wishlist Badge Logic
  const { items: wishlistItems } = useWishlist();
  const [hasWishlistItems, setHasWishlistItems] = useState(false);

  useEffect(() => {
    setHasWishlistItems(wishlistItems.length > 0);
  }, [wishlistItems]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${query}`);
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8 relative">

        <Link href="/" className="flex-shrink-0 group z-50">
          <h1 className="text-3xl font-black tracking-tighter uppercase group-hover:opacity-80 transition">
            Sole<span className="text-blue-600">.</span>
          </h1>
        </Link>

        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2 z-0">
          <Link href="/" className="text-sm font-bold text-gray-900 hover:text-blue-600 uppercase tracking-wide transition">
            New Arrivals
          </Link>
          <Link href="/?category=Men" className="text-sm font-bold text-gray-900 hover:text-blue-600 uppercase tracking-wide transition">
            Men
          </Link>
          <Link href="/?category=Women" className="text-sm font-bold text-gray-900 hover:text-blue-600 uppercase tracking-wide transition">
            Women
          </Link>
          <Link href="/?q=sale" className="text-sm font-bold text-red-600 hover:text-red-800 uppercase tracking-wide transition">
            Sale
          </Link>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 z-50 relative">

          <div className="hidden sm:block relative">
            <form
              onSubmit={handleSearch}
              className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64 bg-white shadow-sm rounded-full px-2 ring-1 ring-gray-200' : 'w-8'}`}
            >
              {isSearchOpen && (
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-transparent pl-2 pr-2 py-1 text-sm focus:outline-none"
                  autoFocus
                  onBlur={() => !query && setIsSearchOpen(false)}
                />
              )}
              <button
                type="button"
                onClick={() => isSearchOpen ? handleSearch : setIsSearchOpen(!isSearchOpen)}
                className="p-1 hover:text-blue-600 transition ml-auto"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          <Link href="/wishlist" className="relative p-1 hover:text-red-500 transition group">
            <Heart className={`w-5 h-5 ${hasWishlistItems ? "fill-red-500 text-red-500" : "text-black"}`} />
            {hasWishlistItems && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              className="hidden md:block text-xs font-bold text-red-600 hover:text-red-800 uppercase tracking-wide"
            >
              Admin
            </Link>
          )}

          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-bold text-gray-900 hover:text-gray-600 whitespace-nowrap">Sign In</button>               
                </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <CartDrawer />
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}