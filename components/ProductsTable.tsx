"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useTrialStatus } from '@/hooks/useTrialStatus';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { getProducts, Product } from '@/data-access/products';
import { ArrowLeft } from 'lucide-react';

const AUTH_TIMEOUT = 15000; // 15 seconds

const ProductsTable = () => {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { isLoading: isTrialLoading } = useTrialStatus();
  const [hasCompletedOnboarding] = useState(false);
  const [authTimeout, setAuthTimeout] = useState(false);
  const [ isNoData, setIsNoData ] = useState(true);
  const [ products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && (isAuthLoading || isTrialLoading)) {
        setAuthTimeout(true);
      }
    }, AUTH_TIMEOUT);
    
    return () => clearTimeout(timer);
  }, [user, isAuthLoading, isTrialLoading]);

  useEffect(() => {
    if (user?.id) {
      const getProds = async () => {
        const data = await getProducts();

        setIsNoData(false);
        setProducts(data);
      };
      
      getProds();
    }
  }, [user?.id, hasCompletedOnboarding]);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mb-4 mx-auto"></div>
          <p className="text-foreground">
            {authTimeout ? 
              "Taking longer than usual? Try refreshing the page 😊." :
              "Verifying access..."}
          </p>
        </div>
      </div>
    )
  }

  if (isNoData || products.length === 0) {
    return (
      <div className="flex flex-col justify-between items-center space-y-2">
        <p>No data found. Create one?</p>
        <Button onClick={() => router.push('/products/add')}>Add Product</Button>
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <ArrowLeft size={20} onClick={() => router.back()} className='cursor-pointer hover:text-gray-500' />
      <h1>Products</h1>
    </div>
  )
}

export default ProductsTable;
