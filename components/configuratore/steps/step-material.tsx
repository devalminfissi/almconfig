'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWizardStore } from '@/lib/stores/wizard-store';
import { Material } from '@/lib/types';
import { Check, Star, Shield, Thermometer, Droplets } from 'lucide-react';

const materials = [
  {
    id: 'pvc' as Material,
    name: 'PVC',
    description: 'Polivinilcloruro - Soluzione economica e versatile',
    image: '/images/materials/pvc.jpg', // Placeholder - sarà sostituito con immagini reali
    features: [
      'Ottimo isolamento termico',
      'Resistente agli agenti atmosferici',
      'Facile manutenzione',
      'Ampia gamma di colori',
      'Durata nel tempo',
      'Prezzo competitivo'
    ],
    advantages: [
      { icon: Thermometer, text: 'Isolamento termico eccellente' },
      { icon: Droplets, text: 'Impermeabile e resistente all\'umidità' },
      { icon: Shield, text: 'Alta durabilità' }
    ],
    basePrice: 150
  },
  {
    id: 'alluminio' as Material,
    name: 'Alluminio',
    description: 'Alluminio - Soluzione premium e moderna',
    image: '/images/materials/alluminio.jpg', // Placeholder - sarà sostituito con immagini reali
    features: [
      'Design moderno ed elegante',
      'Massima resistenza strutturale',
      'Ampia possibilità di finiture',
      'Leggerezza del materiale',
      'Riciclabilità',
      'Adatto a grandi dimensioni'
    ],
    advantages: [
      { icon: Star, text: 'Design premium e moderno' },
      { icon: Shield, text: 'Massima resistenza e durabilità' },
      { icon: Check, text: 'Qualità superiore' }
    ],
    basePrice: 280
  }
];

export function StepMaterial() {
  const { material, setMaterial, nextStep } = useWizardStore();
  const [selectedMaterial, setSelectedMaterial] = React.useState<Material | null>(material || null);

  const handleSelectMaterial = (materialId: Material) => {
    setSelectedMaterial(materialId);
  };

  const handleContinue = () => {
    if (selectedMaterial) {
      setMaterial(selectedMaterial);
      nextStep();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Scegli il Materiale
        </h2>
        <p className="text-gray-600">
          Seleziona il materiale che preferisci per il tuo serramento
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {materials.map((mat) => {
          const isSelected = selectedMaterial === mat.id;
          const MaterialIcon = mat.advantages[0]?.icon || Check;

          return (
            <Card
              key={mat.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected
                  ? 'ring-2 ring-blue-500 shadow-lg scale-[1.02]'
                  : 'hover:shadow-md'
              }`}
              onClick={() => handleSelectMaterial(mat.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  {/* Placeholder per l'immagine */}
                  <div className="text-center">
                    <MaterialIcon className="w-16 h-16 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">Immagine {mat.name}</p>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                <CardTitle className="text-xl mb-2">{mat.name}</CardTitle>
                <CardDescription className="text-base">
                  {mat.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Vantaggi principali */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {mat.advantages.map((advantage, index) => {
                    const IconComponent = advantage.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <IconComponent className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{advantage.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Caratteristiche */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Caratteristiche:</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {mat.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prezzo base */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    €{mat.basePrice}
                  </div>
                  <div className="text-sm text-gray-500">
                    Prezzo base al mq
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Dettagli comparativi */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Confronto Materiali
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">PVC</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Eccellente isolamento termico</li>
              <li>• Resistente all&apos;umidità</li>
              <li>• Manutenzione minima</li>
              <li>• Costo contenuto</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Alluminio</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Design moderno e slim</li>
              <li>• Massima resistenza strutturale</li>
              <li>• Ampia scelta di finiture</li>
              <li>• Perfetto per grandi dimensioni</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pulsante continua */}
      <div className="text-center">
        <Button
          onClick={handleContinue}
          disabled={!selectedMaterial}
          size="lg"
          className="px-8 py-3 text-lg"
        >
          Continua con {selectedMaterial ? materials.find(m => m.id === selectedMaterial)?.name : ''}
        </Button>
        {!selectedMaterial && (
          <p className="text-sm text-gray-500 mt-2">
            Seleziona un materiale per continuare
          </p>
        )}
      </div>
    </div>
  );
}
