import { create } from 'zustand';
import { CartItem, Product } from '@/types';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
 
  fetchCart: () => Promise<void>;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  
  getTotal: () => number;
  getItemCount: () => number;
  getSubtotal: (item: CartItem) => number;
  isInCart: (productId: string) => boolean;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const items = await api.getCart();
      set({ items, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch cart';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  addItem: async (product: Product, quantity = 1) => {
    // Optimistic update
    const existingItem = get().items.find(item => item.productId === product.id);
    const previousItems = get().items;

    if (existingItem) {
      set(state => ({
        items: state.items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }));
      toast.success('Item quantity updated in cart');
    } else {
      const newItem: CartItem = {
        id: `item_${Date.now()}`,
        productId: product.id,
        quantity,
        product
      };
      set(state => ({ items: [...state.items, newItem] }));
      toast.success('Item added to cart');
    }

    set({ isLoading: true, error: null });
    try {
      await api.addToCart(product.id, quantity);
      // Refetch to ensure sync
      await get().fetchCart();
    } catch (error) {
      // Rollback on error
      set({ items: previousItems, isLoading: false });
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item';
      set({ error: errorMessage });
      toast.error(errorMessage);
    }
  },

  updateQuantity: async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await get().removeItem(id);
      return;
    }
    
    const previousItems = get().items;
    // Optimistic update
    set(state => ({
      items: state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    }));

    set({ isLoading: true, error: null });
    try {
      await api.updateCartItem(id, quantity);
      await get().fetchCart();
      toast.success('Quantity updated');
    } catch (error) {
      // Rollback on error
      set({ items: previousItems, isLoading: false });
      const errorMessage = error instanceof Error ? error.message : 'Failed to update quantity';
      set({ error: errorMessage });
      toast.error(errorMessage);
    }
  },

  removeItem: async (id: string) => {
    const previousItems = get().items;
    // Optimistic update
    set(state => ({
      items: state.items.filter(item => item.id !== id)
    }));

    set({ isLoading: true, error: null });
    try {
      await api.removeFromCart(id);
      await get().fetchCart();
      toast.success('Item removed from cart');
    } catch (error) {
      // Rollback on error
      set({ items: previousItems, isLoading: false });
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove item';
      set({ error: errorMessage });
      toast.error(errorMessage);
    }
  },

  clearCart: async () => {
    const previousItems = get().items;
    // Optimistic update
    set({ items: [] });

    set({ isLoading: true, error: null });
    try {
      await api.clearCart();
      set({ items: [], isLoading: false });
      toast.success('Cart cleared');
    } catch (error) {
      // Rollback on error
      set({ items: previousItems, isLoading: false });
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear cart';
      set({ error: errorMessage });
      toast.error(errorMessage);
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

  getSubtotal: (item: CartItem) => {
    return item.product.price * item.quantity;
  },

  isInCart: (productId: string) => {
    const { items } = get();
    return items.some(item => item.productId === productId);
  }
}));