"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type ChosenInventory = {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
}

type InventoryItemOption = {
  id: string
  itemName: string
  quantity: number
  unit: string
  pricePerUnit: number
}

type Props = {
  inventoryItems: InventoryItemOption[]
}

const MultiInventorySelect: React.FC<Props> = ({ inventoryItems }) => {
  const [chosenInventory, setChosenInventory] = useState<ChosenInventory[]>([
    { id: "", itemName: "", quantity: 0, unit: "", pricePerUnit: 0 }
  ]);

  const handleAddInventory = () => {
    if (chosenInventory.length === 0) {
      setChosenInventory([{ id: "", itemName: "", quantity: 0, unit: "", pricePerUnit: 0 }]);
      return;
    }

    const lastItem = chosenInventory[chosenInventory.length - 1];
    if (lastItem.id === "") {
      setChosenInventory([...chosenInventory, { id: "", itemName: "", quantity: 0, unit: "", pricePerUnit: 0 }]);
      return;
    }
  }

  const handleChooseInventory = (chosenItemId: string, index: number) => {
    const item = inventoryItems.find(item => item.id === chosenItemId)!;
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
      <div className="flex justify-between items-center w-full">
        <p>What is required to make one of this product?</p>
        <Button
          className="bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors shadow-subtle hover:shadow-hover"
          onClick={handleAddInventory}
        >
          <Plus /> Inventory
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {chosenInventory.map((item, index) => (
          <div
            className="flex flex-row items-end gap-2"
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

            {
              item.id !== "" && <>
                <div className="flex flex-col">
                  <Input
                    id="quantityAndUnit"
                    className="w-full"
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) => handleChangeQuantity(Number(e.target.value))}
                  />
                </div>
                <p>{item.unit}</p>
                <Button
                  size="icon"
                  variant="destructive"
                  className="size-8 px-2"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2 />
                </Button>
              </>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default MultiInventorySelect;
