import { create } from 'zustand';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
}

interface WishlistStore {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;

  fetchWishlist: () => Promise<void>;
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchWishlist: async () => {
    set({ isLoading: true, error: null });
    try {
      const items = await api.getWishlist();
      set({ items, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch wishlist';
      set({ error: errorMessage, isLoading: false });
    }
  },

  addToWishlist: async (product: Product) => {
    const previousItems = get().items;
    
    // Check if already in wishlist
    if (get().isInWishlist(product.id)) {
      toast.info('Already in your wishlist');
      return;
    }

    // Optimistic update
    const newItem: WishlistItem = {
      id: `wishlist_${Date.now()}`,
      productId: product.id,
      product,
    };
    set((state) => ({
      items: [...state.items, newItem],
    }));

    set({ isLoading: true, error: null });
    try {
      // API call
      await api.addToWishlist(product.id);
      // Re-fetch to sync with server
      await get().fetchWishlist();
    } catch (error) {
      // Revert optimistic update on error
      set({
        items: previousItems,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to add to wishlist'
      });
    }
  },

  removeFromWishlist: async (productId: string) => {
    const previousItems = get().items;
    
    // Optimistic update
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    }));

    set({ isLoading: true, error: null });
    try {
      // API call
      await api.removeFromWishlist(productId);
      // Re-fetch to sync with server
      await get().fetchWishlist();
    } catch (error) {
      // Revert optimistic update on error
      set({
        items: previousItems,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to remove from wishlist'
      });
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