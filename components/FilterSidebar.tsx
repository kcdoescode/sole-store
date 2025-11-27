"use client";

import FilterUI from "./FilterUI";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasFilters = searchParams.get("category") || searchParams.get("brand") || searchParams.get("q");

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
       <div className="sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold tracking-tight text-gray-900">Filters</h3>
            
            {hasFilters && (
              <button 
                onClick={() => router.push("/")}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider transition"
              >
                Reset
              </button>
            )}
          </div>
          
          <FilterUI />
       </div>
    </aside>
  );
}