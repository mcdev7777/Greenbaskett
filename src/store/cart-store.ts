import { create } from 'zustand';
import { CartItem, Product } from '@/types';
import { api } from '@/lib/api';

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
 
  fetchCart: () => Promise<void>;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const items = await api.getCart();
      set({ items, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      set({ isLoading: false });
    }
  },

  addItem: async (product: Product, quantity = 1) => {
    set({ isLoading: true });
    try {
      await api.addToCart(product.id, quantity);
      await get().fetchCart();
    } catch (error) {
      console.error('Failed to add item:', error);
      set({ isLoading: false });
    }
  },

  updateQuantity: async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await get().removeItem(id);
      return;
    }
    
    set({ isLoading: true });
    try {
      await api.updateCartItem(id, quantity);
      await get().fetchCart();
    } catch (error) {
      console.error('Failed to update quantity:', error);
      set({ isLoading: false });
    }
  },

  removeItem: async (id: string) => {
    set({ isLoading: true });
    try {
      await api.removeFromCart(id);
      await get().fetchCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
      set({ isLoading: false });
    }
  },

  clearCart: async () => {
    set({ isLoading: true });
    try {
      await api.clearCart();
      set({ items: [], isLoading: false });
    } catch (error) {
      console.error('Failed to clear cart:', error);
      set({ isLoading: false });
    }
  },

  getTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  },

  getItemCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
}));