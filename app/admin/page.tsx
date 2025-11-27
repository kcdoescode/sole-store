import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { deleteProduct } from "../actions"; 

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    // Check Admin Status
    const { userId } = await auth();

    if (!userId || userId !== process.env.NEXT_PUBLIC_ADMIN_ID) {
        redirect("/");
    }

    // Fetch Data
    const user = await currentUser();

    const products = await db.product.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-6xl mx-auto space-y-8">

                <div className="rounded-xl border bg-white p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="mt-2 text-gray-600">
                                Welcome back, <span className="font-bold text-blue-600">{user?.firstName}</span>.
                            </p>
                        </div>
                        <a href="/admin/add" className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition">
                            + Add New Product
                        </a>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="rounded-lg bg-gray-50 p-6 border">
                            <h3 className="font-semibold text-gray-500">Total Revenue</h3>
                            <p className="text-2xl font-bold">$0.00</p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-6 border">
                            <h3 className="font-semibold text-gray-500">Products</h3>
                            <p className="text-2xl font-bold">{products.length}</p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-6 border">
                            <h3 className="font-semibold text-gray-500">Orders</h3>
                            <p className="text-2xl font-bold">0</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                    <div className="p-6 border-b bg-gray-50">
                        <h2 className="text-xl font-bold text-gray-900">Inventory Management</h2>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {products.length === 0 ? (
                            <div className="p-10 text-center text-gray-500">
                                No products yet. Click "Add New Product" to get started.
                            </div>
                        ) : (
                            products.map((product) => (
                                <div key={product.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4 hover:bg-gray-50 transition">
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                                            <img
                                                src={product.images[0] || "https://via.placeholder.com/150"}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                                            <p className="text-sm text-gray-500">${product.price.toFixed(2)} • {product.brand}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <form action={deleteProduct.bind(null, product.id)}>
                                            <button
                                                type="submit"
                                                className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition"
                                            >
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}