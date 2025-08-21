"use client";

import AddProductComponent from '@/components/AddProductComponent';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";

const AddProductPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center p-8 w-full">
        <ArrowLeft size={20} onClick={() => router.back()} className='cursor-pointer hover:text-gray-500' />
        <h1 className='text-lg ml-2'>Add Product</h1>
      </div>

      <AddProductComponent />
    </div>
  )
}

export default AddProductPage;
