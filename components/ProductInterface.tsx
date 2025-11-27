"use client";

import { useState } from "react";
import { ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  sizes: string[];
  category: string;
  brand: string;
}

export default function ProductInterface({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || "");
  const [selectedImage, setSelectedImage] = useState<string>(product.images?.[0] || "");

  const mainImage = selectedImage || "https://via.placeholder.com/500";

  const cartItemName = selectedSize
    ? `${product.name} (${selectedSize})`
    : product.name;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Store
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

          <div className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-sm">
              <img
                src={mainImage}
                alt={product.name}
                className="h-full w-full object-cover transition-all duration-300"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${selectedImage === img ? "border-blue-600" : "border-transparent"
                      }`}
                  >
                    <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">

            <span className="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">
              {product.brand} • {product.category}
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-3xl font-bold text-gray-900">
                ${(product.price / 100).toFixed(2)}
              </span>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              {product.description}
            </p>

            {product.sizes.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900">Select Size</h3>
                <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex items-center justify-center rounded-md border py-3 text-sm font-medium uppercase sm:flex-1 transition ${selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-4">
              <AddToCartButton
                product={{
                  id: product.id,
                  name: cartItemName,
                  price: product.price,
                  image: mainImage,
                }}
              />
              <p className="text-center text-xs text-gray-500">
                Free shipping on all orders over $150
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm">
                <div className="rounded-full bg-green-100 p-2 text-green-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">Authentic</p>
                  <p className="text-xs text-gray-500">Verified by experts</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm">
                <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders over $150</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}