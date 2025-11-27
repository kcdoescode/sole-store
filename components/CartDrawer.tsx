"use client";

import { useCart } from "@/lib/store";
import { X, ShoppingBag, CreditCard, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { createCheckoutSession } from "@/app/actions";

export default function CartDrawer() {
  const { items, removeItem, decrementItem, addItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  async function handleCheckout() {
    setIsLoading(true);
    try {
      const { url } = await createCheckoutSession(items);
      if (url) window.location.href = url;
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Something went wrong with checkout.");
      setIsLoading(false);
    }
  }

  if (!isClient) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Cart ({totalItems})</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-[110] h-[100dvh] w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex h-full flex-col">

          <div className="flex items-center justify-between border-b px-6 py-4 bg-white">
            <h2 className="text-lg font-bold text-gray-900">Your Cart ({totalItems})</h2>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center space-y-4">
                <div className="bg-gray-50 p-4 rounded-full">
                  <ShoppingBag className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                <button onClick={() => setIsOpen(false)} className="text-blue-600 hover:underline font-medium">
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6 pb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">

                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="line-clamp-2 mr-2 text-sm leading-snug">{item.name}</h3>
                          <p>${(item.price / 100).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Size: {item.selectedSize || "N/A"}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center rounded-lg border border-gray-200 bg-white">
                          <button
                            onClick={() => decrementItem(item.id)}
                            className="p-1.5 hover:bg-gray-50 text-gray-600 transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-sm font-medium text-gray-900 min-w-[1.5rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => addItem(item)}
                            className="p-1.5 hover:bg-gray-50 text-gray-600 transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-xs font-medium text-red-600 hover:text-red-500 underline decoration-red-200 underline-offset-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-100 bg-gray-50 p-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>${(total / 100).toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-xs text-gray-500 mb-4">
                Shipping and taxes calculated at checkout.
              </p>

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 text-base font-bold text-white shadow-lg hover:bg-gray-800 transition disabled:opacity-50 active:scale-[0.98]"
              >
                {isLoading ? "Processing..." : <> Checkout via Stripe <CreditCard className="w-5 h-5 ml-1" /> </>}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}