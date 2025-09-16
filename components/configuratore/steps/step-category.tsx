'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWizardStore } from '@/lib/stores/wizard-store';
import { Category } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import {
  Wind,
  DoorOpen,
  Car,
  VenetianMask,
  Eye,
  Blinds,
  Check,
  Info
} from 'lucide-react';

const categories = [
  {
    id: 'finestra' as Category,
    name: 'Finestra',
    description: 'Finestre classiche per illuminazione e ventilazione',
    icon: Wind,
    materials: ['pvc', 'alluminio'] as const,
    basePrice: 200,
    features: ['Ottima illuminazione', 'Facile apertura', 'Isolamento termico']
  },
  {
    id: 'porta-finestra' as Category,
    name: 'Porta Finestra',
    description: 'Porte finestre per accesso diretto al balcone o giardino',
    icon: DoorOpen,
    materials: ['pvc', 'alluminio'] as const,
    basePrice: 350,
    features: ['Accesso diretto esterno', 'Grande superficie vetrata', 'Design elegante']
  },
  {
    id: 'porta-garage' as Category,
    name: 'Porta Garage',
    description: 'Porte da garage automatiche e manuali',
    icon: Car,
    materials: ['pvc', 'alluminio'] as const,
    basePrice: 800,
    features: ['Automazione disponibile', 'Sicurezza elevata', 'Resistente agli urti']
  },
  {
    id: 'persiane' as Category,
    name: 'Persiane',
    description: 'Persiane per controllo della luce e privacy',
    icon: VenetianMask,
    materials: ['pvc', 'alluminio'] as const,
    basePrice: 120,
    features: ['Regolazione luce', 'Privacy', 'Protezione dal sole']
  },
  {
    id: 'scuri' as Category,
    name: 'Scuri',
    description: 'Scuri tradizionali per oscuramento completo',
    icon: Eye,
    materials: ['pvc', 'alluminio'] as const,
    basePrice: 180,
    features: ['Oscuramento totale', 'Isolamento acustico', 'Sicurezza']
  },
  {
    id: 'tapparelle' as Category,
    name: 'Tapparelle',
    description: 'Tapparelle avvolgibili motorizzate',
    icon: Blinds,
    materials: ['pvc', 'alluminio'] as const,
    basePrice: 150,
    features: ['Automazione', 'Regolazione precisa', 'Facilità d\'uso']
  }
];

export function StepCategory() {
  const { material, category, setCategory, nextStep } = useWizardStore();
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(category || null);

  // Filtra le categorie per materiale selezionato
  const availableCategories = categories.filter(cat =>
    cat.materials.includes(material!)
  );

  const handleSelectCategory = (categoryId: Category) => {
    setSelectedCategory(categoryId);
  };

  const handleContinue = () => {
    if (selectedCategory) {
      setCategory(selectedCategory);
      nextStep();
    }
  };

  if (!material) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Seleziona prima un materiale</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Scegli la Categoria
        </h2>
        <p className="text-gray-600">
          Seleziona il tipo di serramento per il materiale {material.toUpperCase()} scelto
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {availableCategories.map((cat) => {
          const IconComponent = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <Card
              key={cat.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected
                  ? 'ring-2 ring-blue-500 shadow-lg scale-[1.02]'
                  : 'hover:shadow-md'
              }`}
              onClick={() => handleSelectCategory(cat.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <CardTitle className="text-lg mb-2">{cat.name}</CardTitle>
                <CardDescription className="text-sm">
                  {cat.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Caratteristiche principali */}
                <div className="mb-4">
                  <ul className="space-y-2">
                    {cat.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prezzo */}
                <div className="text-center pt-4 border-t">
                  <div className="text-lg font-semibold text-blue-600">
                    Da {formatCurrency(cat.basePrice)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Prezzo indicativo
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Info aggiuntive */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">
              Non trovi quello che cerchi?
            </h4>
            <p className="text-sm text-blue-700">
              Le categorie mostrate sono compatibili con il materiale {material.toUpperCase()} selezionato.
              Se hai bisogno di una soluzione personalizzata, contattaci per un preventivo su misura.
            </p>
          </div>
        </div>
      </div>

      {/* Pulsante continua */}
      <div className="text-center">
        <Button
          onClick={handleContinue}
          disabled={!selectedCategory}
          size="lg"
          className="px-8 py-3 text-lg"
        >
          Configura {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : ''}
        </Button>
        {!selectedCategory && (
          <p className="text-sm text-gray-500 mt-2">
            Seleziona una categoria per continuare
          </p>
        )}
      </div>
    </div>
  );
}
