"use server";

import { db } from "../lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { stripe } from "../lib/stripe";

// ADMIN ACTION: Add New Product
export async function addProduct(formData: FormData) {
  const { userId } = await auth();
  
  // Security Check
  if (userId !== process.env.NEXT_PUBLIC_ADMIN_ID) {
    throw new Error("⛔ ACCESS DENIED: You are not the admin.");
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const category = formData.get("category") as string;
  const brand = formData.get("brand") as string;

  const imageString = formData.get("images") as string; 
  const images = imageString.split(",").map((url) => url.trim()).filter((url) => url);

  const sizeString = formData.get("sizes") as string;
  const sizes = sizeString.split(",").map((s) => s.trim()).filter((s) => s);

  await db.product.create({
    data: {
      name,
      description,
      price,
      images, 
      sizes, 
      category,
      brand,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

// PAYMENT ACTION: Create Stripe Checkout Session
type CheckoutItem = {
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export async function createCheckoutSession(items: CheckoutItem[]) {
  const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd", 
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price, // Amount in cents
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: `${origin}?success=true`, 
    cancel_url: `${origin}?canceled=true`,
  });

  return { url: session.url };
}

// ADMIN ACTION: Delete Product
export async function deleteProduct(productId: string, formData: FormData) {
  const { userId } = await auth();

  // Security Check
  if (userId !== process.env.NEXT_PUBLIC_ADMIN_ID) {
    throw new Error("⛔ ACCESS DENIED: You are not the admin.");
  }

  try {
    await db.product.delete({
      where: {
        id: productId,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw new Error("Failed to delete product");
  }
}

// WISHLIST ACTION: Fetch products by ID array
export async function getProductsByIds(ids: string[]) {
  // If no IDs, return empty array immediately
  if (!ids || ids.length === 0) return [];

  try {
    const products = await db.product.findMany({
      where: {
        id: { in: ids },
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching wishlist products:", error);
    return [];
  }
}