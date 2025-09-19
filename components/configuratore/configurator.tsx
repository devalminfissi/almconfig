'use client';

import React, { useState, useEffect } from 'react';
import { useWizardStore } from '@/lib/stores/wizard-store';
import { StepNavigation } from './step-navigation';
import { AuthRequired } from './steps/auth-required';
import { StepMaterial } from './steps/step-material';
import { StepCategory } from './steps/step-category';
import { StepConfiguration } from './steps/step-configuration';
import { StepPreview } from './steps/step-preview';
import { StepQuote } from './steps/step-quote';

const TOTAL_STEPS = 5;

export function Configurator() {
  const { currentStep, user } = useWizardStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Prevent hydration mismatch
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    // Check if user is already authenticated
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user]);


  if (!hydrated) {
    // Return loading state during SSR
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Navigation Skeleton */}
          <div className="mb-8">
            <StepNavigation totalSteps={TOTAL_STEPS} />
          </div>

          {/* Content Skeleton */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show authentication required if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <AuthRequired />
          </div>
        </div>
      </div>
    );
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <StepMaterial />;
      case 1:
        return <StepCategory />;
      case 2:
        return <StepConfiguration />;
      case 3:
        return <StepPreview />;
      case 4:
        return <StepQuote />;
      default:
        return <StepMaterial />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <StepNavigation totalSteps={TOTAL_STEPS} />
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
}
