"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const AddProductForm = () => {

  const [productName, setProductName] = useState('');

  const handleAddProduct = async () => {
    const dto = {
      productName,
    }

    console.log('handleAddProduct', dto)
  }

  return (
    <div className="p-8">
      <form className="space-y-4" action={handleAddProduct}>
        <div className="space-y-2">
          <Label
            htmlFor="productName"
            className="text-sm font-medium text-slate-700"
          >
            Product Name
          </Label>
          <Input
            id="productName"
            className="w-full"
            type="text"
            placeholder="Earrings"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
      </form>
    </div>
  )
}

export default AddProductForm;
