import { db } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import MobileFilter from "@/components/MobileFilter";
import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer"; 
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function Home(props: { searchParams: Promise<any> }) {
  
  const searchParams = await props.searchParams;
  const query = searchParams?.q;
  const brand = searchParams?.brand;
  const category = searchParams?.category;

  const whereClause: Prisma.ProductWhereInput = {};

  if (query) {
    whereClause.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  if (brand) {
    whereClause.brand = { equals: brand as string, mode: "insensitive" };
  }

  if (category) {
    whereClause.category = { equals: category as string, mode: "insensitive" };
  }

  const products = await db.product.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-white text-black flex flex-col">
      
      <AnnouncementBar />

      <Navbar />

      {(!query && !brand && !category) && (
        <HeroSection />
      )}

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10 w-full">
        
        <FilterSidebar />

        <div className="flex-1">
          
          <MobileFilter />

          {(query || brand || category) && (
             <div className="mb-6 text-sm text-gray-500">
                Showing results for: 
                <span className="font-semibold text-black ml-1">
                  {[query, brand, category].filter(Boolean).join(", ")}
                </span>
             </div>
          )}

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => {
                const mainImage = product.images?.[0] || "https://via.placeholder.com/300";
                return (
                  <ProductCard 
                    key={product.id} 
                    product={{
                        ...product,
                        mainImage: mainImage,
                        sizes: product.sizes || [],
                        brand: product.brand
                    }} 
                  />
                );
            })}

            {products.length === 0 && (
              <div className="col-span-full text-center py-32 bg-gray-50 rounded-xl">
                <p className="text-xl font-medium text-gray-900">No products match your search.</p>
                <p className="text-gray-500 mt-2">Try clearing the filters or search for something else.</p>
                <a href="/" className="inline-block mt-4 text-blue-600 font-semibold hover:underline">Clear all filters</a>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}