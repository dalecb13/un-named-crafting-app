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

type ChosenInventory = {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
}

const MultiInventorySelect = () => {
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
            key={index}
          >
            <Input type="text" placeholder="Item Name" />
            <Input
              id="quantityAndUnit"
              className="w-full rounded-none rounded-l-lg"
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleChangeQuantity(Number(e.target.value))}
            />
            <Input type="text" placeholder="Unit" />
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
