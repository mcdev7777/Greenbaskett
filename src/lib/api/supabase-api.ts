import { supabase } from '@/lib/supabase'
import { Product } from '@/types'

export const supabaseApi = {
  // Get all products
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching products:', error)
      throw error
    }

    // Transform Supabase data to match your Product type
    return data.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      price: Number(product.price),
      compareAtPrice: product.compare_at_price ? Number(product.compare_at_price) : undefined,
      images: product.images || [],
      category: product.category || '',
      brand: product.brand,
      rating: product.rating,
      color: product.color,
      condition: product.condition,
      inventory: product.inventory || 0,
      isActive: true,
    }))
  },

  // Get product by slug
  async getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching product:', error)
      return null
    }

    if (!data) return null

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description || '',
      price: Number(data.price),
      compareAtPrice: data.compare_at_price ? Number(data.compare_at_price) : undefined,
      images: data.images || [],
      category: data.category || '',
      brand: data.brand,
      rating: data.rating,
      color: data.color,
      condition: data.condition,
      inventory: data.inventory || 0,
      isActive: true,
    }
  },

  // Search products
  async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)

    if (error) {
      console.error('Error searching products:', error)
      throw error
    }

    return data.map(product => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      price: Number(product.price),
      compareAtPrice: product.compare_at_price ? Number(product.compare_at_price) : undefined,
      images: product.images || [],
      category: product.category || '',
      brand: product.brand,
      rating: product.rating,
      color: product.color,
      condition: product.condition,
      inventory: product.inventory || 0,
      isActive: true,
    }))
  },
}