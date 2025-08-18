import { AddPrivateInventoryError } from "@/utils/error"
import { supabase } from "@/utils/supabase"

export type AddInventoryDto = {
  itemName: string
  company: string
  price: number
  currency: string
  quantity: number
  quantityUnit: string
}

const getPrivateInventory = async () => {
  try {
    const { data, error } = await supabase
      .from('private_inventory_item')
      .select("*");

    if (error) {
      console.error('Error fetching private inventory:', error);
      return [];
    }

    return data
  } catch (e) {
    console.warn('Error fetching private inventory:', e);
    throw new Error(`Error fetching private inventory: ${e}`)
  }
}

const addPrivateInventory = async (dto: AddInventoryDto) => {
  const { data, error } = await supabase
    .from('private_inventory_item')
    .insert({
      item_name: dto.itemName,
      parent_company: dto.company,
      price: dto.price,
      currency: dto.currency,
      // price_per_unit: dto.pricePerUnit,
      quantity: dto.quantity,
      quantity_unit: dto.quantityUnit
    });

  if (error) {
    console.error('Error adding private inventory:', error);
    throw new AddPrivateInventoryError(`Error adding private inventory: ${error}`)
  }

  return data;
}

export { getPrivateInventory, addPrivateInventory }
