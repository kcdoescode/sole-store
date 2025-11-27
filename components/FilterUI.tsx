"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FilterUI() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  const currentBrand = searchParams.get("brand");
  const currentCategory = searchParams.get("category");

  return (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
          Category
        </h4>
        <div className="flex flex-col gap-3">
          {["Men", "Women", "Kids"].map((cat) => {
            const isSelected = currentCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilterChange("category", cat)}
                className={`
                  w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border
                  ${isSelected 
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200" 
                    : "bg-white text-gray-700 border-gray-100 hover:border-blue-200 hover:bg-blue-50"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{cat}</span>
                  {isSelected && (
                    <span className="bg-white/20 p-1 rounded-full">
                       <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                       </svg>
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
          Brand
        </h4>
        <div className="flex flex-wrap gap-2">
          {["Nike", "Adidas", "Puma", "New Balance"].map((brand) => {
            const isSelected = currentBrand === brand;
            return (
              <button
                key={brand}
                onClick={() => handleFilterChange("brand", brand)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                  ${isSelected 
                    ? "bg-black text-white border-black" 
                    : "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black"
                  }
                `}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}