"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useTrialStatus } from '@/hooks/useTrialStatus';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { getPrivateInventory, InventoryItem } from '@/data-access/private-inventory';

const AUTH_TIMEOUT = 15000; // 15 seconds

export const InventoryTable = () => {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { isInTrial, trialEndTime, isLoading: isTrialLoading } = useTrialStatus();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [authTimeout, setAuthTimeout] = useState(false);
  const [ isNoData, setIsNoData ] = useState(true);
  const [ inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

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
      // Get user's inventory
      const getInventory = async () => {
        const data = await getPrivateInventory();

        setIsNoData(false);
        setInventoryItems(data);
      };
      
      getInventory();
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

  if (isNoData) {
    return (
      <div className="flex flex-col justify-between items-center space-y-2">
        <p>No data found. Create one?</p>
        <Button onClick={() => router.push('/inventory/add')}>Add Inventory</Button>
      </div>
    )
  }

  return (
    <div className="flex justify-between">
      {
        inventoryItems.map(inventoryItem => {
          return (
            <div key={inventoryItem.id}>
              {inventoryItem.name}
            </div>
          )
        })
      }
    </div>
  )
}