import axios from 'axios';
import { Product, CartItem, Order } from '@/types';
import { toast } from 'sonner';

const API_URL = 'http://localhost:3001';

// Configure axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Error handler - throws always
const handleError = (error: any, defaultMessage: string): never => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message || defaultMessage;
    toast.error(message);
    throw new Error(message);
  }
  toast.error(defaultMessage);
  throw error;
};

export const api = {
  // ============ PRODUCTS ============
  getProducts: async (): Promise<Product[]> => {
    try {
      const { data } = await axiosInstance.get<Product[]>('/products');
      return data;
    } catch (error) {
      return handleError(error, 'Failed to fetch products');
    }
  },

  getProductBySlug: async (slug: string): Promise<Product | null> => {
    try {
      const { data } = await axiosInstance.get<Product[]>(`/products?slug=${slug}`);
      return data[0] || null;
    } catch (error) {
      return handleError(error, 'Failed to fetch product');
    }
  },

  getProductById: async (id: string): Promise<Product | null> => {
    try {
      const { data } = await axiosInstance.get<Product>(`/products/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      return handleError(error, 'Failed to fetch product');
    }
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      if (!query.trim()) return [];
      const { data } = await axiosInstance.get<Product[]>('/products');
      const searchTerm = query.toLowerCase();
      return data.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.brand.toLowerCase().includes(searchTerm)
      );
    } catch (error) {
      return handleError(error, 'Failed to search products');
    }
  },

  filterProducts: async (filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    brand?: string;
    inStock?: boolean;
  }): Promise<Product[]> => {
    try {
      const { data } = await axiosInstance.get<Product[]>('/products');
      return data.filter(product => {
        if (filters.category && product.category !== filters.category) return false;
        if (filters.minPrice && product.price < filters.minPrice) return false;
        if (filters.maxPrice && product.price > filters.maxPrice) return false;
        if (filters.brand && product.brand !== filters.brand) return false;
        if (filters.inStock && product.inventory <= 0) return false;
        return true;
      });
    } catch (error) {
      return handleError(error, 'Failed to filter products');
    }
  },

  // ============ CART ============
  getCart: async (): Promise<CartItem[]> => {
    try {
      const { data } = await axiosInstance.get<CartItem[]>('/cart');
      return data;
    } catch (error) {
      return handleError(error, 'Failed to fetch cart');
    }
  },

  addToCart: async (productId: string, quantity: number = 1): Promise<CartItem> => {
    try {
      const cart = await api.getCart();
      const existingItem = cart.find(item => item.productId === productId);

      if (existingItem) {
        const { data } = await axiosInstance.patch<CartItem>(`/cart/${existingItem.id}`, {
          quantity: existingItem.quantity + quantity
        });
        toast.success('Cart updated');
        return data;
      } else {
        const product = await api.getProductById(productId);
        if (!product) throw new Error('Product not found');

        const { data } = await axiosInstance.post<CartItem>('/cart', {
          productId,
          quantity,
          product
        });
        toast.success('Added to cart');
        return data;
      }
    } catch (error) {
      return handleError(error, 'Failed to add item to cart');
    }
  },

  updateCartItem: async (id: string, quantity: number): Promise<CartItem> => {
    try {
      if (quantity <= 0) {
        await api.removeFromCart(id);
        const { data: cartData } = await axiosInstance.get<CartItem[]>('/cart');
        return cartData.find(item => item.id === id) || {} as CartItem;
      }

      const { data } = await axiosInstance.patch<CartItem>(`/cart/${id}`, { quantity });
      return data;
    } catch (error) {
      return handleError(error, 'Failed to update cart item');
    }
  },

  removeFromCart: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/cart/${id}`);
      toast.success('Removed from cart');
    } catch (error) {
      return handleError(error, 'Failed to remove item from cart');
    }
  },

  clearCart: async (): Promise<void> => {
    try {
      const cart = await api.getCart();
      await Promise.all(cart.map(item => axiosInstance.delete(`/cart/${item.id}`)));
      toast.success('Cart cleared');
    } catch (error) {
      return handleError(error, 'Failed to clear cart');
    }
  },

  // ============ WISHLIST ============
  getWishlist: async () => {
    try {
      const { data } = await axiosInstance.get('/wishlist');
      return data;
    } catch (error) {
      return handleError(error, 'Failed to fetch wishlist');
    }
  },

  addToWishlist: async (productId: string) => {
    try {
      const wishlist = await api.getWishlist();
      const product = await api.getProductById(productId);
      
      if (!product) throw new Error('Product not found');

      const existingItem = wishlist.find((item: any) => item.productId === productId);
      if (existingItem) {
        toast.info('Already in wishlist');
        return existingItem;
      }

      const { data } = await axiosInstance.post('/wishlist', {
        productId,
        product
      });
      toast.success('Added to wishlist');
      return data;
    } catch (error) {
      return handleError(error, 'Failed to add to wishlist');
    }
  },

  removeFromWishlist: async (productId: string): Promise<void> => {
    try {
      const wishlist = await api.getWishlist();
      const item = wishlist.find((item: any) => item.productId === productId);
      
      if (item) {
        await axiosInstance.delete(`/wishlist/${item.id}`);
        toast.success('Removed from wishlist');
      }
    } catch (error) {
      return handleError(error, 'Failed to remove from wishlist');
    }
  },

  // ============ ORDERS ============
  createOrder: async (order: Omit<Order, 'id'>): Promise<Order> => {
    try {
      const { data } = await axiosInstance.post<Order>('/orders', {
        ...order,
        id: `order_${Date.now()}`,
        createdAt: new Date().toISOString()
      });
      toast.success('Order created successfully');
      return data;
    } catch (error) {
      return handleError(error, 'Failed to create order');
    }
  },

  getOrders: async (userId?: string): Promise<Order[]> => {
    try {
      const { data } = await axiosInstance.get<Order[]>('/orders');
      return userId ? data.filter(order => (order as any).userId === userId) : data;
    } catch (error) {
      return handleError(error, 'Failed to fetch orders');
    }
  },

  getOrderById: async (orderId: string): Promise<Order | null> => {
    try {
      const { data } = await axiosInstance.get<Order>(`/orders/${orderId}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      return handleError(error, 'Failed to fetch order');
    }
  }
};