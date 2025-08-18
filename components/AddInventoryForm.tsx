"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";
import { AddInventoryDto, addPrivateInventory } from "@/data-access/private-inventory";
import { AddPrivateInventoryError } from "@/utils/error";
import QuantityAndUnitFormField from "./QuantityAndUnitFormField";
import CurrencyFormField from "./CurrencyFormField";
import { Label } from "./ui/label";
import { toast } from "sonner"

const UNITS = ['g', 'oz', 'lb']

const AddInventoryForm = () => {
  const [itemName, setItemName] = useState('');
  const [company, setCompany] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [quantityUnit, setQuantityUnit] = useState(UNITS[0]);

  const [isPending, startTransition] = useTransition();

  const addInventoryItemAction = async () => {
    startTransition(async () => {
      const dto: AddInventoryDto = {
        itemName,
        company,
        price: totalPrice,
        currency,
        quantity,
        quantityUnit,
      }

      try {
        const data = await addPrivateInventory(dto);
        toast("Inventory added successfully")
        console.log('data: ', data);

        setItemName('');
        setCompany('');
        setTotalPrice(0);
        setQuantity(0);
        setQuantityUnit('');
      } catch (err) {
        if (err instanceof AddPrivateInventoryError) {
          // setError(err.message);
          toast("There was an error adding the item.\nPlease try again.")
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

        <QuantityAndUnitFormField
          quantity={quantity}
          onChangeQuantity={(q) => setQuantity(q)}
          units={UNITS}
          unit={quantityUnit}
          handleChangeQuantityUnit={(u) => setQuantityUnit(u)}
        />

        <CurrencyFormField
          currencies={['USD', 'EUR', 'GBP']}
          currency={currency}
          onChangeCurrency={setCurrency}
          totalPrice={totalPrice.toString()}
          onChangeTotalPrice={(tpString) => setTotalPrice(Number(tpString))}
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
