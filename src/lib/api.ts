import { Product, CartItem, Order } from '@/types';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';


const transformSupabaseProduct = (data: any): Product => ({
  id: data.id,
  name: data.name,
  slug: data.slug,
  description: data.description || '',
  price: Number(data.price),
  compareAtPrice: data.compare_at_price ? Number(data.compare_at_price) : null,
  images: data.images || [],
  category: data.category || '',
  brand: data.brand,
  rating: data.rating,
  color: data.color,
  condition: data.condition,
  screenSize: data.screen_size || '',
  memory: data.memory || 'N/A',
  inventory: data.inventory || 0,
  isActive: true,
});

export const api = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) throw error;
      return data.map(transformSupabaseProduct);
    } catch (error: any) {
      toast.error('Failed to fetch products');
      throw error;
    }
  },

  getProductBySlug: async (slug: string): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data ? transformSupabaseProduct(data) : null;
    } catch (error: any) {
      toast.error('Failed to fetch product');
      throw error;
    }
  },

  getProductById: async (id: string): Promise<Product | null> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data ? transformSupabaseProduct(data) : null;
    } catch (error: any) {
      return null;
    }
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      if (!query.trim()) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%,brand.ilike.%${query}%`);

      if (error) throw error;
      return data.map(transformSupabaseProduct);
    } catch (error: any) {
      toast.error('Failed to search products');
      throw error;
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
      let query = supabase.from('products').select('*');

      if (filters.category) query = query.eq('category', filters.category);
      if (filters.minPrice) query = query.gte('price', filters.minPrice);
      if (filters.maxPrice) query = query.lte('price', filters.maxPrice);
      if (filters.brand) query = query.eq('brand', filters.brand);
      if (filters.inStock) query = query.gt('inventory', 0);

      const { data, error } = await query;
      if (error) throw error;
      return data.map(transformSupabaseProduct);
    } catch (error: any) {
      toast.error('Failed to filter products');
      throw error;
    }
  },

  // ============ CART ============
  getCart: async (): Promise<CartItem[]> => {
    try {
      const { data, error } = await supabase
        .from('cart')
        .select(`*, product:products(*)`);

      if (error) throw error;
      
      return data.map((item: any) => ({
        id: item.id,
        productId: item.product_id,
        quantity: item.quantity,
        product: transformSupabaseProduct(item.product),
      }));
    } catch (error: any) {
      toast.error('Failed to fetch cart');
      throw error;
    }
  },

  addToCart: async (productId: string, quantity: number = 1): Promise<CartItem> => {
    try {
      const userId = 'temp-user-id';

      const { data: existing } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();

      if (existing) {
        const { data, error } = await supabase
          .from('cart')
          .update({ quantity: existing.quantity + quantity })
          .eq('id', existing.id)
          .select(`*, product:products(*)`)
          .single();

        if (error) throw error;
        toast.success('Cart updated');
        
        return {
          id: data.id,
          productId: data.product_id,
          quantity: data.quantity,
          product: transformSupabaseProduct(data.product),
        };
      } else {
        const { data, error } = await supabase
          .from('cart')
          .insert({ user_id: userId, product_id: productId, quantity })
          .select(`*, product:products(*)`)
          .single();

        if (error) throw error;
        toast.success('Added to cart');
        
        return {
          id: data.id,
          productId: data.product_id,
          quantity: data.quantity,
          product: transformSupabaseProduct(data.product),
        };
      }
    } catch (error: any) {
      toast.error('Failed to add item to cart');
      throw error;
    }
  },

  updateCartItem: async (id: string, quantity: number): Promise<CartItem> => {
    try {
      if (quantity <= 0) {
        await api.removeFromCart(id);
        return {} as CartItem;
      }

      const { data, error } = await supabase
        .from('cart')
        .update({ quantity })
        .eq('id', id)
        .select(`*, product:products(*)`)
        .single();

      if (error) throw error;
      
      return {
        id: data.id,
        productId: data.product_id,
        quantity: data.quantity,
        product: transformSupabaseProduct(data.product),
      };
    } catch (error: any) {
      toast.error('Failed to update cart item');
      throw error;
    }
  },

  removeFromCart: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase.from('cart').delete().eq('id', id);
      if (error) throw error;
      toast.success('Removed from cart');
    } catch (error: any) {
      toast.error('Failed to remove item from cart');
      throw error;
    }
  },

  clearCart: async (): Promise<void> => {
    try {
      const userId = 'temp-user-id';
      const { error } = await supabase.from('cart').delete().eq('user_id', userId);
      if (error) throw error;
      toast.success('Cart cleared');
    } catch (error: any) {
      toast.error('Failed to clear cart');
      throw error;
    }
  },

  // ============ WISHLIST ============
  getWishlist: async () => {
    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select(`*, product:products(*)`);

      if (error) throw error;
      
      return data.map((item: any) => ({
        id: item.id,
        productId: item.product_id,
        product: transformSupabaseProduct(item.product),
      }));
    } catch (error: any) {
      toast.error('Failed to fetch wishlist');
      throw error;
    }
  },

  addToWishlist: async (productId: string) => {
    try {
      const userId = 'temp-user-id';

      const { data: existing } = await supabase
        .from('wishlist')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();

      if (existing) {
        toast.info('Already in wishlist');
        return existing;
      }

      const { data, error } = await supabase
        .from('wishlist')
        .insert({ user_id: userId, product_id: productId })
        .select(`*, product:products(*)`)
        .single();

      if (error) throw error;
      toast.success('Added to wishlist');
      
      return {
        id: data.id,
        productId: data.product_id,
        product: transformSupabaseProduct(data.product),
      };
    } catch (error: any) {
      toast.error('Failed to add to wishlist');
      throw error;
    }
  },

  removeFromWishlist: async (productId: string): Promise<void> => {
    try {
      const userId = 'temp-user-id';
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) throw error;
      toast.success('Removed from wishlist');
    } catch (error: any) {
      toast.error('Failed to remove from wishlist');
      throw error;
    }
  },

  // ============ ORDERS ============
  createOrder: async (order: Omit<Order, 'id'>): Promise<Order> => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: 'temp-user-id',
          total: order.total,
          status: 'processing',
        })
        .select()
        .single();

      if (error) throw error;
      toast.success('Order created successfully');
      
      return { id: data.id, ...order };
    } catch (error: any) {
      toast.error('Failed to create order');
      throw error;
    }
  },

  getOrders: async (userId?: string): Promise<Order[]> => {
    try {
      let query = supabase.from('orders').select('*');
      if (userId) query = query.eq('user_id', userId);

      const { data, error } = await query;
      if (error) throw error;
      return data as Order[];
    } catch (error: any) {
      toast.error('Failed to fetch orders');
      throw error;
    }
  },

  getOrderById: async (orderId: string): Promise<Order | null> => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data as Order;
    } catch (error: any) {
      return null;
    }
  },
};