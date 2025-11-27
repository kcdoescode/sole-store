import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string; 
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void; 
  decrementItem: (id: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (data) =>
        set((state) => {
          const sizeSuffix = data.selectedSize ? `-${data.selectedSize}` : '';
          const uniqueCartId = `${data.id}${sizeSuffix}`;

          const existingItem = state.items.find((item) => item.id === uniqueCartId);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === uniqueCartId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return { 
            items: [
              ...state.items, 
              { 
                ...data, 
                id: uniqueCartId, 
                quantity: 1 
              } 
            ] 
          };
        }),

      decrementItem: (cartId) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === cartId);
          
          if (existingItem && existingItem.quantity === 1) {
            return {
              items: state.items.filter((item) => item.id !== cartId),
            };
          }

          return {
            items: state.items.map((item) =>
              item.id === cartId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          };
        }),

      removeItem: (cartId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== cartId),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'sole-cart-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);