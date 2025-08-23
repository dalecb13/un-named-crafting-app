"use client";

import ProductsTable from "@/components/ProductsTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ProductsPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-8 w-full flex justify-between">
        <div className="flex items-center">
          <ArrowLeft size={20} onClick={() => router.back()} className='cursor-pointer hover:text-gray-500' />
          <h1 className="text-lg ml-2">Products Table</h1>
        </div>

        <Button
          onClick={() => router.push('/products/add')}
          className="hidden sm:block px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors shadow-subtle hover:shadow-hover"
        >
          Add Product
        </Button>
      </div>

      <ProductsTable />
    </div>
  )
}

export default ProductsPage;
