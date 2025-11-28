"use client";

import { useState } from "react";
import { Menu, X, ChevronRight, Search } from "lucide-react"; // Import Search icon
import { useRouter, useSearchParams } from "next/navigation";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false); // Close menu on search
    if (query.trim()) {
      router.push(`/?q=${query}`);
    } else {
      router.push("/");
    }
  };

  const handleLinkClick = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  const brands = [
    { name: "Nike", href: "/?brand=Nike" },
    { name: "Adidas", href: "/?brand=Adidas" },
    { name: "Puma", href: "/?brand=Puma" },
    { name: "New Balance", href: "/?brand=New Balance" },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 -mr-2 text-black hover:bg-gray-100 rounded-full transition lg:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <div 
        className={`fixed top-0 right-0 z-[110] h-[100dvh] w-full max-w-xs bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          
          <div className="flex items-center justify-end p-6 border-b border-gray-50">
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-6">
             
             <form onSubmit={handleSearch} className="relative mb-8">
                <input 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
                >
                   <Search className="w-5 h-5" />
                </button>
             </form>

             <div className="space-y-6 mb-8">
                <button 
                  onClick={() => handleLinkClick("/")} 
                  className="text-2xl font-black text-gray-900 hover:text-blue-600 transition block w-full text-left"
                >
                  New Releases
                </button>
                <button 
                  onClick={() => handleLinkClick("/?q=sale")} 
                  className="text-2xl font-black text-red-600 hover:text-red-800 transition block w-full text-left"
                >
                  Sale
                </button>
             </div>

             <div className="mb-8 pt-8 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Shop by Brand</h3>
                <div className="space-y-6">
                  {brands.map((brand) => (
                    <button
                      key={brand.name}
                      onClick={() => handleLinkClick(brand.href)}
                      className="flex items-center justify-between w-full group"
                    >
                      <span className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition">
                        {brand.name}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-black transition" />
                    </button>
                  ))}
                </div>
             </div>

             <div className="pt-8 border-t border-gray-100 space-y-4">
                 <button onClick={() => handleLinkClick("/admin")} className="block text-sm font-medium text-gray-500 hover:text-black">
                    Admin Dashboard
                 </button>
             </div>
          </div>

          <div className="p-8 border-t border-gray-100 bg-gray-50">
             <p className="text-xs text-gray-400 font-medium mb-4">Need help or want to know more?</p>
             <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleLinkClick("/about")}
                  className="w-full px-6 py-3 bg-black text-white text-sm font-bold rounded-full hover:bg-gray-800 transition"
                >
                  About Us
                </button>
                <a 
                  href="mailto:chauhankm81@gmail.com"
                  className="w-full flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-black text-sm font-bold rounded-full hover:bg-gray-50 transition"
                >
                  Help Center
                </a>
             </div>
          </div>

        </div>
      </div>
    </>
  );
}