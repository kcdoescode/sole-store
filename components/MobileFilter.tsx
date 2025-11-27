"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import FilterUI from "./FilterUI";
import { useRouter, useSearchParams } from "next/navigation";

export default function MobileFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasFilters = searchParams.get("category") || searchParams.get("brand") || searchParams.get("q");

  const handleReset = () => {
    router.push("/");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden w-full flex items-center justify-center gap-2 bg-white border border-gray-200 p-3 rounded-xl text-sm font-bold text-gray-900 mb-6 hover:bg-gray-50 transition active:scale-[0.98]"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters & Sort
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
           
           <div
             className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
             onClick={() => setIsOpen(false)}
           />

           <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-200">
              
              <div className="sticky top-0 z-10 flex items-center justify-between mb-6 bg-white pb-2 border-b border-gray-100">
                 <div className="flex items-center gap-3">
                    <h2 className="text-xl font-black tracking-tight">Filters</h2>
                    {hasFilters && (
                      <button 
                        onClick={handleReset}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider transition"
                      >
                        Reset
                      </button>
                    )}
                 </div>
                 
                 <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              <FilterUI />

              <div className="sticky bottom-0 bg-white pt-4 mt-8 border-t border-gray-100">
                <button
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-900 transition active:scale-[0.98]"
                >
                    Show Results
                </button>
              </div>
           </div>
        </div>
      )}
    </>
  );
}