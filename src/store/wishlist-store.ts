import { create } from 'zustand';
import { Product } from '@/types';
import { api } from '@/lib/api';

interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
}

interface WishlistStore {
  items: WishlistItem[];
  isLoading: boolean;

  fetchWishlist: () => Promise<void>;
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  isLoading: false,

  fetchWishlist: async () => {
    set({ isLoading: true });
    try {
      const items = await api.getWishlist();
      set({ items, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      set({ isLoading: false });
    }
  },

  addToWishlist: async (product: Product) => {
    set({ isLoading: true });
    try {
      // Optimistic update
      const newItem: WishlistItem = {
        id: Date.now().toString(),
        productId: product.id,
        product,
      };
      set((state) => ({
        items: [...state.items, newItem],
      }));

      // API call
      await api.addToWishlist(product.id);
      // Re-fetch to sync with server
      await get().fetchWishlist();
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      // Revert optimistic update on error
      set((state) => ({
        items: state.items.filter((item) => item.productId !== product.id),
        isLoading: false,
      }));
    }
  },

  removeFromWishlist: async (productId: string) => {
    set({ isLoading: true });
    try {
      // Optimistic update
      set((state) => ({
        items: state.items.filter((item) => item.productId !== productId),
      }));

      // API call
      await api.removeFromWishlist(productId);
      // Re-fetch to sync with server
      await get().fetchWishlist();
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      // Revert optimistic update on error
      await get().fetchWishlist();
    }
  },

  isInWishlist: (productId: string) => {
    const { items } = get();
    return items.some((item) => item.productId === productId);
  },

  getItemCount: () => {
    const { items } = get();
    return items.length;
  },
}));
