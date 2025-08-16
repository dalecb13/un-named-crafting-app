"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";
import { AddInventoryDto, addPrivateInventory } from "@/data-access/private-inventory";
import { AddPrivateInventoryError } from "@/utils/error";
import QuantityAndUnitFormField from "./QuantityAndUnitFormField";
import CurrencyFormField from "./CurrencyFormField";
import { Label } from "./ui/label";

const UNITS = ['g', 'oz', 'lb']

const AddInventoryForm = () => {
  const [error, setError] = useState('');
  const [itemName, setItemName] = useState('');
  const [company, setCompany] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [quantityUnit, setQuantityUnit] = useState(UNITS[0]);

  const [isPending, startTransition] = useTransition();

  const handleChangeQuantityUnit = (unit: string) => {
    console.log('handleChangeQuantityUnit', unit)
    setQuantityUnit(unit);
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
      console.log('dto', dto)

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

        <div className="space-y-2">
          <Label
            htmlFor="itemName"
            className="text-sm font-medium text-slate-700"
          >
            Item Name
          </Label>
          <Input
            id="itemName"
            className="w-full"
            type="text"
            placeholder="White Polymer Clay"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="companyName"
            className="text-sm font-medium text-slate-700 mb-2"
          >
            Company
          </Label>
          <Input
            id="companyName"
            className="w-full"
            type="text"
            placeholder="Sculpey"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="quantityAndUnit"
            className="text-sm font-medium text-slate-700 mb-2"
          >
            Quantity
          </Label>
          <QuantityAndUnitFormField
            quantity={quantity}
            onChangeQuantity={setQuantity}
            units={UNITS}
            unit={quantityUnit}
            handleChangeQuantityUnit={(unit) => handleChangeQuantityUnit(unit)}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="quantityAndUnit"
            className="text-sm font-medium text-slate-700 mb-2"
          >
            Total Price
          </Label>
          <CurrencyFormField
            currencies={['USD', 'EUR', 'GBP']}
            currency="USD"
            onChangeCurrency={() => {}}
            totalPrice={totalPrice.toString()}
            onChangePrice={() => {}}
          />
        </div>

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
