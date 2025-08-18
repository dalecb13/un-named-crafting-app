"use client";

import { InventoryTable } from "@/components/InventoryTable";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useTrialStatus } from "@/hooks/useTrialStatus";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AUTH_TIMEOUT = 15000; // 15 seconds

export default function Inventory() {
  const router = useRouter();
  const { subscription, isLoading: isSubLoading, fetchSubscription } = useSubscription();
  const { isInTrial, isLoading: isTrialLoading } = useTrialStatus();
  const { user, isSubscriber, isLoading: isAuthLoading } = useAuth();
  const [hasCheckedSubscription, setHasCheckedSubscription] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [authTimeout, setAuthTimeout] = useState(false);

  // First check - Subscription and trial check
  useEffect(() => {
    if (isSubLoading || isTrialLoading) return;
    
    const hasValidSubscription = ['active', 'trialing'].includes(subscription?.status || '');
    
    console.log('Access check isInTrial:', {
      hasSubscription: !!subscription,
      status: subscription?.status,
      isInTrial: isInTrial,
      validUntil: subscription?.current_period_end
    });

    // Only redirect if there's no valid subscription AND no valid trial
    if (!hasValidSubscription && !isInTrial) {
      console.log('No valid subscription or trial, redirecting');
      router.replace('/profile');
    }
  }, [subscription, isSubLoading, isTrialLoading, router, isInTrial]);

  // Second check - Auth check
  useEffect(() => {
    if (isAuthLoading || isTrialLoading) return;

    console.log('Access check:', {
      isSubscriber,
      hasCheckedSubscription,
      isInTrial: isInTrial,
      authLoading: isAuthLoading,
    });

    if (!hasCheckedSubscription) {
      setHasCheckedSubscription(true);
      
      // Allow access for both subscribers and trial users
      if (!user || (!isSubscriber && !isInTrial && !isAuthLoading)) {
        console.log('No valid subscription or trial, redirecting');
        router.replace('/profile');
      }
    }
  }, [isSubscriber, isAuthLoading, hasCheckedSubscription, router, user, subscription, isTrialLoading, isInTrial]);

  // Add refresh effect
  useEffect(() => {
    const refreshSubscription = async () => {
      await fetchSubscription();
      setHasCheckedSubscription(true);
    };
    
    if (user?.id) {
      refreshSubscription();
    }
  }, [user?.id, fetchSubscription]);

  useEffect(() => {
    if (user?.id) {
      // Check if user has completed onboarding
      const checkOnboarding = async () => {
        const { data } = await supabase
          .from('user_preferences')
          .select('has_completed_onboarding')
          .eq('user_id', user.id)
          .single();
        
        setHasCompletedOnboarding(!!data?.has_completed_onboarding);
        console.log('hasCompletedOnboarding: ', hasCompletedOnboarding)
      };
      
      checkOnboarding();
    }
  }, [user?.id, hasCompletedOnboarding]);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && (isAuthLoading || isTrialLoading)) {
        setAuthTimeout(true);
      }
    }, AUTH_TIMEOUT);
    
    return () => clearTimeout(timer);
  }, [user, isAuthLoading, isTrialLoading]);

    if (!user && (isAuthLoading || isTrialLoading) && !hasCheckedSubscription) {
    console.log('user: ', user)
    console.log('isAuthLoading: ', isAuthLoading)
    console.log('hasCheckedSubscription: ', hasCheckedSubscription)
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
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-8 w-full flex justify-between">
        <h1>Inventory Table</h1>

        <button
          onClick={() => router.push('/inventory/add')}
          className="hidden sm:block px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-medium transition-colors shadow-subtle hover:shadow-hover"
        >
          Add Inventory
        </button>
      </div>

      <InventoryTable />
    </div>
  );
}