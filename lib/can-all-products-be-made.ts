type InventoryItemOption = {
  id: string
  totalQuantity: number
  quantityPerUnitProduct: number
  unit: string
}

/**
 * Calculate whether or not the number of products can be created from the given list of inventory items.
 * @param productDetails 
 * @param inventoryItemOptionList 
 */
const canAllProductsBeMade = (productQuantity: number, inventoryItemOptionList: InventoryItemOption[]) => {
  // check if any quantityPerUnitProduct exceeds totalQuantity
  const isEnoughInventory = inventoryItemOptionList.every(item => productQuantity * item.quantityPerUnitProduct <= item.totalQuantity);
  return isEnoughInventory;
}

export default canAllProductsBeMade;
