"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useTrialStatus } from '@/hooks/useTrialStatus';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AUTH_TIMEOUT = 15000; // 15 seconds

export const InventoryTable = () => {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { isInTrial, trialEndTime, isLoading: isTrialLoading } = useTrialStatus();
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [authTimeout, setAuthTimeout] = useState(false);
  const [ isNoData, setIsNoData ] = useState(true);

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
      // Check if user has completed onboarding
      const checkOnboarding = async () => {
        const { data } = await supabase
          .from('private_inventory_item')
          .select()
          .eq('owner_id', user.id)
          .single();

        if (!data) {
          setIsNoData(true);
        }
      };
      
      checkOnboarding();
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
      <div className="flex justify-between">
        <h1>Inventory Table</h1>
        <button
          onClick={() => router.push('/inventory/add')}
          className="hidden sm:block px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors shadow-subtle hover:shadow-hover"
        >
          Add Inventory
        </button>
      </div>
    )
  }

  return (
    <div className="flex justify-between">
      <h1>Inventory Table</h1>

      <button
        onClick={() => router.push('/inventory/add')}
        className="hidden sm:block px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors shadow-subtle hover:shadow-hover"
      >
        Add Inventory
      </button>
    </div>
  )
}