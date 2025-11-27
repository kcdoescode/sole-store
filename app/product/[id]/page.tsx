import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductInterface from "@/components/ProductInterface"; 

export const dynamic = "force-dynamic";

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