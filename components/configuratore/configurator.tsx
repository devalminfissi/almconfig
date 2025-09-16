'use client';

import React from 'react';
import { useWizardStore } from '@/lib/stores/wizard-store';
import { StepNavigation } from './step-navigation';
import { StepAccess } from './steps/step-access';
import { StepMaterial } from './steps/step-material';
import { StepCategory } from './steps/step-category';
import { StepConfiguration } from './steps/step-configuration';
import { StepPreview } from './steps/step-preview';
import { StepQuote } from './steps/step-quote';

const TOTAL_STEPS = 6;

export function Configurator() {
  const { currentStep } = useWizardStore();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <StepAccess />;
      case 1:
        return <StepMaterial />;
      case 2:
        return <StepCategory />;
      case 3:
        return <StepConfiguration />;
      case 4:
        return <StepPreview />;
      case 5:
        return <StepQuote />;
      default:
        return <StepAccess />;
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
