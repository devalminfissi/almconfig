import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWizardStore } from '@/lib/stores/wizard-store';
import { getStepTitle, getStepDescription } from '@/lib/utils';

interface StepNavigationProps {
  totalSteps: number;
  className?: string;
}

export function StepNavigation({ totalSteps, className }: StepNavigationProps) {
  const {
    currentStep,
    prevStep,
    nextStep,
    canProceedToNextStep,
    isStepValid
  } = useWizardStore();

  // Prevent hydration mismatch by not rendering until hydrated
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Return a skeleton/placeholder during SSR
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Configuratore Serramenti
          </h1>
          <p className="text-gray-600">
            Crea la tua configurazione personalizzata in pochi semplici passi
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">
              Caricamento...
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full"></div>
        </div>

        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div key={index} className="w-3 h-3 rounded-full bg-gray-300" />
          ))}
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" disabled className="flex items-center space-x-2">
            <ChevronLeft className="w-4 h-4" />
            <span>Indietro</span>
          </Button>
          <Button disabled className="flex items-center space-x-2">
            <span>Avanti</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Configuratore Serramenti
        </h1>
        <p className="text-gray-600">
          Crea la tua configurazione personalizzata in pochi semplici passi
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            Passo {currentStep + 1} di {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {getStepTitle(currentStep)}
          </span>
        </div>

        <ProgressBar
          value={progress}
          showLabel={false}
          className="h-3"
        />

        <p className="text-center text-sm text-gray-600">
          {getStepDescription(currentStep)}
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index <= currentStep
                ? 'bg-blue-600'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-4">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={isFirstStep}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Indietro</span>
        </Button>

        <div className="flex space-x-2">
          {!isLastStep && (
            <Button
              onClick={nextStep}
              disabled={!canProceedToNextStep()}
              className="flex items-center space-x-2"
            >
              <span>Avanti</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}

          {isLastStep && (
            <Button
              onClick={() => {
                // Handle final submission
                console.log('Submitting configuration...');
              }}
              disabled={!isStepValid(currentStep)}
              className="bg-green-600 hover:bg-green-700"
            >
              Invia Richiesta Preventivo
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
