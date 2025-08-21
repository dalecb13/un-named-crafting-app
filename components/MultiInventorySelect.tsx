"use client";

import { useEffect, useState } from "react";
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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type ChosenInventory = {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
}

type InventoryItemOption = {
  id: string
  itemName: string
  quantity: number
  unit: string
}

type Props = {
  inventoryItems: InventoryItemOption[]
}

const MultiInventorySelect: React.FC<Props> = ({ inventoryItems }) => {
  const [chosenInventory, setChosenInventory] = useState<ChosenInventory[]>([
    { id: "", itemName: "", quantity: 0, unit: "" }
  ]);

  const handleAddInventory = () => {
    if (chosenInventory.length === 0) {
      setChosenInventory([{ id: "", itemName: "", quantity: 0, unit: "" }]);
      return;
    }

    const lastItem = chosenInventory[chosenInventory.length - 1];
    if (lastItem.id === "") {
      setChosenInventory([...chosenInventory, { id: "", itemName: "", quantity: 0, unit: "" }]);
      return;
    }
  }

  const handleChooseInventory = (chosenItemId: string, index: number) => {
    console.log('handleChooseInventory', chosenItemId, index);

    console.log('inventoryItems', inventoryItems);
    const item = inventoryItems.find(item => item.id === chosenItemId)!;
    console.log('found item', item);
    chosenInventory.splice(index, 1, item);
    setChosenInventory([...chosenInventory]);
  }

  const handleChangeQuantity = (quantity: number) => {
    setChosenInventory(chosenInventory.map((item, index) => {
      if (index === chosenInventory.length - 1) {
        return { ...item, quantity };
      }
      return item;
    }));
  }

  const handleRemoveItem = (itemId: string) => {
    setChosenInventory(chosenInventory.filter(item => item.id !== itemId));
  }

  return (
    <div className="flex flex-col gap-2">
      <p onClick={handleAddInventory}>Inventory Items that make the product</p>
      <div className="flex flex-col gap-2">
        {chosenInventory.map((item, index) => (
          <div
            className="flex flex-row gap-2"
            key={item.id}
          >
            <Select
              name="inventoryItem"
              value={item.id}
              onValueChange={(chosenItemId) => handleChooseInventory(chosenItemId, index)}
            >
              <SelectTrigger
                className="w-[500px]"
              >
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                {
                  inventoryItems.map((ii) => (
                    <SelectItem
                      key={ii.id}
                      value={ii.id}
                    >
                      {ii.itemName}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>

            <Input
              id="quantityAndUnit"
              className="w-full rounded-none rounded-l-lg"
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleChangeQuantity(Number(e.target.value))}
            />
            <Input id="unit" type="text" placeholder="Unit" />
            <Button
              onClick={() => handleRemoveItem(item.id)}
            >
              <X />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MultiInventorySelect;
