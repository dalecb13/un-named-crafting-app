import { GetProductError } from "@/utils/error";
import { supabase } from "@/utils/supabase";

export type Product = {
  id: string;
  productName: string;
  productDescription: string;
  tags: string[];
  numberOfUnits: number;
  ownerId: string;
}

const getProducts = async(): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select("*");

  if (error) { throw new GetProductError(`Error getting your products: ${error}`); }

  return data;
}

export { getProducts }
