"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";
import { AddInventoryDto, addPrivateInventory } from "@/data-access/private-inventory";
import { AddPrivateInventoryError } from "@/utils/error";

const AddInventoryForm = () => {
  const [error, setError] = useState('');
  const [itemName, setItemName] = useState('');
  const [company, setCompany] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [quantityUnit, setQuantityUnit] = useState('');

  const [isPending, startTransition] = useTransition();


  const addInventoryItemAction = async () => {
    startTransition(async () => {
      const dto: AddInventoryDto = {
        itemName,
        company,
        price: 0,
        currency: 'USD',
        quantity,
        quantityUnit,
      }

      try {
        const data = await addPrivateInventory(dto);
        console.log('data: ', data);

        setItemName('');
        setCompany('');
        setTotalPrice(0);
        setQuantity(0);
        setQuantityUnit('');
      } catch (err) {
        if (err instanceof AddPrivateInventoryError) {
          setError(err.message);
        }
      }
    })
  }

  return (
    <div className="p-8">
      <form
        className="space-y-4"
        action={addInventoryItemAction}
      >
        <Input
          className="w-full"
          type="text"
          placeholder="Clay"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />

        <Input
          className="w-full"
          type="text"
          placeholder="Sculpey"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <Input
          className="w-full"
          type="number"
          placeholder="Total price"
          value={totalPrice}
          onChange={(e) => setTotalPrice(Number(e.target.value))}
        />

        <Input
          className="w-full"
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <Input
          className="w-full"
          type="number"
          placeholder="grams"
          value={quantityUnit}
          onChange={(e) => setQuantityUnit(e.target.value)}
        />
        
        <Button
          type="submit"
          disabled={isPending}
        >
          Add Inventory
        </Button>
      </form>
    </div>
  )
}

export default AddInventoryForm;
