"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { getPrivateInventory } from "@/data-access/private-inventory";
import MultiInventorySelect from "./MultiInventorySelect";

type InventoryItemOption = {
  id: string
  itemName: string
  quantity: number
  unit: string
}

const AddProductComponent = () => {
  const [productName, setProductName] = useState('');
  const [inventoryItems, setInventoryItems] = useState<InventoryItemOption[]>([]);
  const [productQuantity, setProductQuantity] = useState(0);

  useEffect(() => {
    const getInventory = async () => {
      const data = await getPrivateInventory();
      const iis: InventoryItemOption[] = data.map(d => {
        return {
          id: d.id,
          itemName: d.itemName,
          quantity: d.quantity,
          unit: d.unit,
        }
      });

      setInventoryItems(iis);
    }

    getInventory();
  }, []);

  return (
    <div className="p-8 space-y-4">
      <div className="space-y-2">
        <Label
          htmlFor="productName"
          className="text-sm font-medium text-slate-700"
        >
          Product Name
        </Label>
        <Input
          id="productName"
          placeholder="Terracotta"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      <MultiInventorySelect
        inventoryItems={inventoryItems}
      />

      <div className="space-y-2">
        <Label
          htmlFor="productQuantity"
          className="text-sm font-medium text-slate-700"
        >
          Quantity
        </Label>
        <Input
          id="productQuantity"
          placeholder="Terracotta"
          value={productQuantity}
          type="number"
          onChange={(e) => setProductQuantity(Number(e.target.value))}
        />
      </div>

    </div>
  )
}

export default AddProductComponent;
