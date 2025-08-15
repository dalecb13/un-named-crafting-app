"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";
import { AddInventoryDto, addPrivateInventory } from "@/data-access/private-inventory";
import { AddPrivateInventoryError } from "@/utils/error";
import QuantityAndUnitFormField from "./QuantityAndUnitFormField";
import CurrencyFormField from "./CurrencyFormField";

const AddInventoryForm = () => {
  const [error, setError] = useState('');
  const [itemName, setItemName] = useState('');
  const [company, setCompany] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [quantityUnit, setQuantityUnit] = useState('');

  const [isPending, startTransition] = useTransition();

  const handleChangeQuantityUnit = (quantityUnit: string) => {
    setQuantityUnit(quantityUnit);
  }

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
          placeholder="Product Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />

        <Input
          className="w-full"
          type="text"
          placeholder="Parent Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <QuantityAndUnitFormField
          quantity={quantity}
          handleChangeQuantity={setQuantity}
          units={['g', 'oz', 'lb']}
          unit={quantityUnit}
          handleChangeQuantityUnit={(unit) => handleChangeQuantityUnit(unit)}
        />

        <CurrencyFormField
          currencies={['USD', 'EUR', 'GBP']}
          currency="USD"
          handleChangeCurrency={() => {}}
          amount={totalPrice.toString()}
          handleChangeAmount={() => {}}
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
