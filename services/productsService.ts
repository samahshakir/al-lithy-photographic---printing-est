import { supabase } from './supabaseClient';
import { Product } from '../types';

export const productsService = {
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async addProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    // Prepare data for Supabase - ensure images is properly formatted
    const productData = {
      title_ar: product.title_ar,
      title_en: product.title_en,
      description_ar: product.description_ar,
      description_en: product.description_en,
      price: product.price || null,
      category: product.category || null,
      icon: product.icon,
      images: product.images || [],  // Ensure it's always an array
      active: product.active !== false
    };

    console.log('Sending to Supabase:', productData);

    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    return data;
  },

  async updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'created_at'>>): Promise<Product> {
    const updateData: any = {};

    if (updates.title_ar !== undefined) updateData.title_ar = updates.title_ar;
    if (updates.title_en !== undefined) updateData.title_en = updates.title_en;
    if (updates.description_ar !== undefined) updateData.description_ar = updates.description_ar;
    if (updates.description_en !== undefined) updateData.description_en = updates.description_en;
    if (updates.price !== undefined) updateData.price = updates.price || null;
    if (updates.category !== undefined) updateData.category = updates.category || null;
    if (updates.icon !== undefined) updateData.icon = updates.icon;
    if (updates.images !== undefined) updateData.images = updates.images || [];
    if (updates.active !== undefined) updateData.active = updates.active;

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .update({ active: false })
      .eq('id', id);

    if (error) throw error;
  },

  async permanentlyDeleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
