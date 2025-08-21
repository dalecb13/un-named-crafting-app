"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { getPrivateInventory } from "@/data-access/private-inventory";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";
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
  const [selectedInventoryItems, setSelectedInventoryItems] = useState<InventoryItemOption[]>([
    {
      id: '',
      itemName: '',
      quantity: 0,
      unit: '',
    }
  ]);

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

  const handleSelectItem = (id: string) => {
    const index = selectedInventoryItems.findIndex(si => si.id === id);
    const newSelectedInventoryItems = [...selectedInventoryItems];
    newSelectedInventoryItems.splice(index, 1);
    setSelectedInventoryItems(newSelectedInventoryItems);
  }

  const handleChangeQuantity = (id: string, quantity: number) => {
    const index = selectedInventoryItems.findIndex(si => si.id === id);
    const newSelectedInventoryItems = [...selectedInventoryItems];
    newSelectedInventoryItems[index].quantity = quantity;
    setSelectedInventoryItems(newSelectedInventoryItems);
  }

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

    </div>
  )
}

export default AddProductComponent;
