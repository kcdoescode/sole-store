import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductInterface from "@/components/ProductInterface"; 

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await db.product.findUnique({
    where: { id },
  });

  if (!product) return notFound();

  // pass the database data into your Interactive Interface
  return (
    <ProductInterface 
        product={{
            ...product,
            images: product.images || [], 
            sizes: product.sizes || [],   
            category: product.category || "Unisex",
            brand: product.brand || "Brand",
        }} 
    />
  );
}