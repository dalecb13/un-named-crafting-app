import { AddProductError, GetProductError } from "@/utils/error";
import { supabase } from "@/utils/supabase";

export type Product = {
  id: string;
  productName: string;
  productDescription: string;
  tags: string[];
  numberOfUnits: number;
  ownerId: string;
}

export type AddProductDto = {
  productName: string;
  productDescription: string;
  tags: string[];
  numberOfUnits: number;
  ownerId: string;
}

const PRODUCTS_TABLE = 'products';

const getProducts = async(): Promise<Product[]> => {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .select("*");

  if (error) { throw new GetProductError(`Error getting your products: ${error}`); }

  return data;
}

const addProduct = async (dto: AddProductDto) => {
  const { data, error } = await supabase
    .from(PRODUCTS_TABLE)
    .insert({
      product_name: dto.productName,
      product_description: dto.productDescription,
      tags: dto.tags,
      number_of_units: dto.numberOfUnits,
      owner_id: dto.ownerId,
    });

  if (error) {
    console.error('Error adding your product:', error);
    throw new AddProductError(`Error adding your product: ${error}`)
  }

  return data;
}

export { getProducts, addProduct }
