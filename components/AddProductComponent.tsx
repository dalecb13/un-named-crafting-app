"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { getPrivateInventory } from "@/data-access/private-inventory";
import MultiInventorySelect from "./MultiInventorySelect";
import { Button } from "./ui/button";

type InventoryItemOption = {
  id: string
  itemName: string
  quantity: number
  unit: string
  pricePerUnit: number
}

type ChosenInventory = {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
}

const AddProductComponent = () => {
  const [productName, setProductName] = useState('');
  const [inventoryItems, setInventoryItems] = useState<InventoryItemOption[]>([]);
  const [chosenInventory, setChosenInventory] = useState<ChosenInventory[]>([
    { id: "", itemName: "", quantity: 0, unit: "", pricePerUnit: 0 }
  ]);
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
          pricePerUnit: d.pricePerUnit
        }
      });

      setInventoryItems(iis);
    }

    getInventory();
  }, []);

  const pricePerProduct = useMemo(() => {
    const totalPrice = chosenInventory
      .reduce((acc, item) => {
        return acc + item.pricePerUnit * item.quantity
      }, 0);
    return totalPrice / productQuantity;
  }, [chosenInventory, productQuantity]);

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

  const handleRemoveItem = (itemId: string) => {
    setChosenInventory(chosenInventory.filter(item => item.id !== itemId));
  }

  const handleChangeQuantity = (itemId: string, quantity: number) => {
    setChosenInventory(chosenInventory.map((item, index) => { 
      if (index === chosenInventory.length - 1) {
        return { ...item, quantity };
      }
      return item;
    }));
  }

  const handleCreateProduct = () => {
    console.log('handleCreateProduct', { productName, chosenInventory, productQuantity, pricePerProduct });
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
        chosenInventory={chosenInventory}
        onAddInventory={handleAddInventory}
        onChooseInventory={handleChooseInventory}
        onRemoveInventoryItem={handleRemoveItem}
        onChangeItemQuantity={handleChangeQuantity}
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

      <div className="space-y-2">
        <p>Price per Unit</p>
        {
          productQuantity === 0
            ? <p>USD0</p>
            : <p>USD{pricePerProduct}</p>
        }
      </div>
      <Button
        className="bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors shadow-subtle hover:shadow-hover"
        onClick={handleCreateProduct}
      >
        Create Product
      </Button>
    </div>
  )
}

export default AddProductComponent;
