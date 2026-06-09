import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/data/products";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          const exists = state.items.find((i) => i.id === product.id);
          if (exists) return state;
          return { items: [...state.items, product] };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        }));
      },
      toggleItem: (product) => {
        const exists = get().items.find((i) => i.id === product.id);
        if (exists) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((i) => i.id === productId);
      },
      clearWishlist: () => set({ items: [] }),
      getTotalItems: () => get().items.length,
    }),
    {
      name: "reboot-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
