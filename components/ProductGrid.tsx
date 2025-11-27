import { db } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import { Prisma } from "@prisma/client";

interface ProductGridProps {
  searchParams: {
    q?: string;
    brand?: string;
    category?: string;
  };
}

export default async function ProductGrid({ searchParams }: ProductGridProps) {
  const { q: query, brand, category } = searchParams;

  const whereClause: Prisma.ProductWhereInput = {};

  if (query) {
    whereClause.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  if (brand) {
    whereClause.brand = { equals: brand, mode: "insensitive" };
  }

  if (category) {
    whereClause.category = { equals: category, mode: "insensitive" };
  }

  // Fetch data from the database
  const products = await db.product.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 animate-in fade-in duration-500">
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
  );
}