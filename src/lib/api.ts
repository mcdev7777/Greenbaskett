import axios from 'axios';
import { Product, CartItem, Order } from '@/types';

const API_URL = 'http://localhost:3001';

export const api = {
  // Products
  getProducts: async (): Promise<Product[]> => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  },

  getProductBySlug: async (slug: string): Promise<Product | null> => {
    const response = await axios.get(`${API_URL}/products?slug=${slug}`);
    return response.data[0] || null;
  },

  getProductById: async (id: string): Promise<Product | null> => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  },

  // Cart
  getCart: async (): Promise<CartItem[]> => {
    const response = await axios.get(`${API_URL}/cart`);
    return response.data;
  },

  addToCart: async (productId: string, quantity: number = 1): Promise<CartItem> => {
    const cart = await api.getCart();
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
      const response = await axios.patch(`${API_URL}/cart/${existingItem.id}`, {
        quantity: existingItem.quantity + quantity
      });
      return response.data;
    } else {
      const product = await api.getProductById(productId);
      const response = await axios.post(`${API_URL}/cart`, {
        productId,
        quantity,
        product
      });
      return response.data;
    }
  },

  updateCartItem: async (id: string, quantity: number): Promise<CartItem> => {
    const response = await axios.patch(`${API_URL}/cart/${id}`, { quantity });
    return response.data;
  },

  removeFromCart: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/cart/${id}`);
  },

  clearCart: async (): Promise<void> => {
    const cart = await api.getCart();
    await Promise.all(cart.map(item => axios.delete(`${API_URL}/cart/${item.id}`)));
  },

  createOrder: async (order: Omit<Order, 'id'>): Promise<Order> => {
    const response = await axios.post(`${API_URL}/orders`, order);
    return response.data;
  },

  // Wishlist
  getWishlist: async () => {
    const response = await axios.get(`${API_URL}/wishlist`);
    return response.data;
  },

  addToWishlist: async (productId: string) => {
    const wishlist = await api.getWishlist();
    const product = await api.getProductById(productId);
    
    const existingItem = wishlist.find((item: any) => item.productId === productId);
    if (existingItem) {
      return existingItem;
    }

    const response = await axios.post(`${API_URL}/wishlist`, {
      productId,
      product
    });
    return response.data;
  },

  removeFromWishlist: async (productId: string): Promise<void> => {
    const wishlist = await api.getWishlist();
    const item = wishlist.find((item: any) => item.productId === productId);
    
    if (item) {
      await axios.delete(`${API_URL}/wishlist/${item.id}`);
    }
  }
};