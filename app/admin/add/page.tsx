"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { addProduct } from "../../actions"; 

export default function AddProductPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      const adminId = process.env.NEXT_PUBLIC_ADMIN_ID;
      if (!user || user.id !== adminId) {
        router.push("/");
      }
    }
  }, [isLoaded, user, router]);

  async function handleSubmit(formData: FormData) {
    await addProduct(formData);
  }

  if (!isLoaded) return <div className="p-10 text-gray-500">Checking security...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="mx-auto max-w-2xl rounded-xl border bg-white p-8 shadow-sm">
        
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Add New Sneaker (Upgraded)
        </h1>

        <form action={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Name</label>
              <input name="name" required type="text" placeholder="Air Jordan 1" className="w-full rounded-md border p-3" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Price (cents)</label>
              <input name="price" required type="number" placeholder="15000" className="w-full rounded-md border p-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Brand</label>
              <select name="brand" className="w-full rounded-md border p-3 bg-white">
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="New Balance">New Balance</option>
                <option value="Puma">Puma</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
              <select name="category" className="w-full rounded-md border p-3 bg-white">
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Sizes (Available)</label>
            <input 
                name="sizes" 
                required 
                type="text" 
                placeholder="US 7, US 8, US 9, US 10" 
                className="w-full rounded-md border p-3" 
            />
            <p className="mt-1 text-xs text-gray-500">Separate sizes with commas.</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" required rows={3} placeholder="Product details..." className="w-full rounded-md border p-3" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Image URLs</label>
            <textarea 
                name="images" 
                required 
                rows={3} 
                placeholder="https://image1.jpg, https://image2.jpg" 
                className="w-full rounded-md border p-3" 
            />
            <p className="mt-1 text-xs text-gray-500">Paste multiple image links separated by commas.</p>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button type="submit" className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800">
              Add Product
            </button>
            <a href="/admin" className="rounded-lg border px-6 py-3 text-gray-700 hover:bg-gray-50">Cancel</a>
          </div>

        </form>
      </div>
    </div>
  );
}