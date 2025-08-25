import { AddPrivateInventoryError, GetPrivateEnventoryError } from "@/utils/error"
import { supabase } from "@/utils/supabase"

export type AddInventoryDto = {
  itemName: string
  company: string
  price: number
  currency: string
  quantity: number
  quantityUnit: string
  ownerId: string
}

export type InventoryItem = {
  id: string;
  itemName: string;
  company: string;
  currency: string;
  totalPrice: number;
  quantity: number;
  unit: string;
  pricePerUnit: number;
}

const getPrivateInventory = async (): Promise<InventoryItem[]> => {
  const { data, error } = await supabase
    .from('private_inventory_item')
    .select("*");

  if (error) {
    console.error('Error fetching private inventory:', error);
    throw new GetPrivateEnventoryError(`Error fetching private inventory: ${error}`);
  }

  if (!data) {
    return [];
  }

  const inventory: InventoryItem[] = data.map((item) => {
    return {
      id: item.id,
      itemName: item.item_name,
      company: item.parent_company,
      currency: item.currency,
      totalPrice: item.price,
      quantity: item.quantity,
      unit: item.quantity_unit,
      pricePerUnit: item.price_per_unit,
    };
  });

  return inventory;
}

const addPrivateInventory = async (dto: AddInventoryDto) => {
  const { data, error } = await supabase
    .from('private_inventory_item')
    .insert({
      item_name: dto.itemName,
      parent_company: dto.company,
      price: dto.price,
      currency: dto.currency,
      price_per_unit: dto.price / dto.quantity,
      quantity: dto.quantity,
      quantity_unit: dto.quantityUnit,
      owner_id: dto.ownerId,
    });

  if (error) {
    console.error('Error adding private inventory:', error);
    throw new AddPrivateInventoryError(`Error adding private inventory: ${error}`)
  }

  return data;
}

export { getPrivateInventory, addPrivateInventory }
