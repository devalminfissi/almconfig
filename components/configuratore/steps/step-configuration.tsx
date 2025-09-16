'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWizardStore } from '@/lib/stores/wizard-store';
import { dimensionsSchema, colorsSchema, type DimensionsData, type ColorsData } from '@/lib/validations';
import { GlassType } from '@/lib/types';
import {
  Ruler,
  Palette,
  Eye,
  Plus,
  Minus,
  Check,
  AlertCircle
} from 'lucide-react';

// Colori disponibili
const availableColors = [
  { id: 'bianco', name: 'Bianco', hex: '#FFFFFF', category: 'neutro' },
  { id: 'nero', name: 'Nero', hex: '#000000', category: 'neutro' },
  { id: 'grigio-chiaro', name: 'Grigio Chiaro', hex: '#D1D5DB', category: 'neutro' },
  { id: 'grigio-scuro', name: 'Grigio Scuro', hex: '#4B5563', category: 'neutro' },
  { id: 'marrone', name: 'Marrone', hex: '#92400E', category: 'neutro' },
  { id: 'blu', name: 'Blu', hex: '#3B82F6', category: 'colorato' },
  { id: 'verde', name: 'Verde', hex: '#10B981', category: 'colorato' },
  { id: 'rosso', name: 'Rosso', hex: '#EF4444', category: 'colorato' },
  { id: 'beige', name: 'Beige', hex: '#F5F5DC', category: 'neutro' },
  { id: ' antracite', name: 'Antracite', hex: '#2D3748', category: 'neutro' }
];

// Tipi di vetro disponibili
const glassTypes: Array<{ id: GlassType; name: string; description: string; price: number }> = [
  { id: 'singolo', name: 'Vetro Singolo', description: 'Vetro standard 4mm', price: 0 },
  { id: 'doppio', name: 'Vetro Doppio', description: 'Isolamento termico base', price: 50 },
  { id: 'triplo', name: 'Vetro Triplo', description: 'Massimo isolamento termico', price: 120 },
  { id: 'antisfondamento', name: 'Antisfondamento', description: 'Sicurezza elevata', price: 80 },
  { id: 'acustico', name: 'Acustico', description: 'Riduzione rumore', price: 90 },
  { id: 'termico', name: 'Termico', description: 'Isolamento termico avanzato', price: 100 }
];

// Accessori disponibili
const accessories = [
  { id: 'maniglia-standard', name: 'Maniglia Standard', price: 25, category: 'maniglie' },
  { id: 'maniglia-premium', name: 'Maniglia Premium', price: 45, category: 'maniglie' },
  { id: 'serratura-sicurezza', name: 'Serratura di Sicurezza', price: 35, category: 'sicurezza' },
  { id: 'fermaglio', name: 'Fermaglio', price: 15, category: 'accessori' },
  { id: 'zanzariera', name: 'Zanzariera', price: 60, category: 'protezione' },
  { id: 'tenda-interna', name: 'Tenda Interna', price: 40, category: 'decorazione' }
];

export function StepConfiguration() {
  const {
    dimensions,
    colors,
    glassType,
    accessories: selectedAccessories,
    setDimensions,
    setColors,
    setGlassType,
    addAccessory,
    removeAccessory,
    nextStep,
    material,
    category
  } = useWizardStore();

  const [activeTab, setActiveTab] = useState<'dimensions' | 'colors' | 'glass' | 'accessories'>('dimensions');

  // Form per le dimensioni
  const dimensionsForm = useForm<DimensionsData>({
    resolver: zodResolver(dimensionsSchema),
    defaultValues: dimensions || {
      width: 100,
      height: 150,
      depth: category === 'porta-garage' ? 20 : undefined
    }
  });

  // Form per i colori
  const colorsForm = useForm<ColorsData>({
    resolver: zodResolver(colorsSchema),
    defaultValues: colors || {
      esterno: 'bianco',
      interno: 'bianco',
      profili: 'bianco'
    }
  });

  const [selectedGlass, setSelectedGlass] = useState<GlassType>(glassType || 'doppio');

  const tabs = [
    { id: 'dimensions' as const, name: 'Dimensioni', icon: Ruler, completed: !!dimensions },
    { id: 'colors' as const, name: 'Colori', icon: Palette, completed: !!colors },
    { id: 'glass' as const, name: 'Vetro', icon: Eye, completed: !!glassType },
    { id: 'accessories' as const, name: 'Accessori', icon: Plus, completed: selectedAccessories.length > 0 }
  ];

  const handleDimensionsSubmit = (data: DimensionsData) => {
    setDimensions(data);
    setActiveTab('colors');
  };

  const handleColorsSubmit = (data: ColorsData) => {
    setColors(data);
    setActiveTab('glass');
  };

  const handleGlassSelect = (glass: GlassType) => {
    setSelectedGlass(glass);
    setGlassType(glass);
    setActiveTab('accessories');
  };

  const handleContinue = () => {
    if (dimensions && colors && glassType) {
      nextStep();
    }
  };

  const isStepValid = dimensions && colors && glassType;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Configura il tuo Serramento
        </h2>
        <p className="text-gray-600">
          Personalizza dimensioni, colori e accessori per {material?.toUpperCase()} - {category}
        </p>
      </div>

      {/* Tabs di navigazione */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          const isCompleted = tab.completed;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : isCompleted
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.name}</span>
              {isCompleted && <Check className="w-4 h-4" />}
            </button>
          );
        })}
      </div>

      {/* Contenuto dei tab */}
      <div className="space-y-6">
        {/* Dimensioni */}
        {activeTab === 'dimensions' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Ruler className="w-5 h-5" />
                <span>Dimensioni del Serramento</span>
              </CardTitle>
              <CardDescription>
                Inserisci le dimensioni desiderate in centimetri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={dimensionsForm.handleSubmit(handleDimensionsSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Larghezza (cm) *</Label>
                    <Input
                      id="width"
                      type="number"
                      {...dimensionsForm.register('width', { valueAsNumber: true })}
                      className={dimensionsForm.formState.errors.width ? 'border-red-500' : ''}
                    />
                    {dimensionsForm.formState.errors.width && (
                      <p className="text-sm text-red-600">{dimensionsForm.formState.errors.width.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Altezza (cm) *</Label>
                    <Input
                      id="height"
                      type="number"
                      {...dimensionsForm.register('height', { valueAsNumber: true })}
                      className={dimensionsForm.formState.errors.height ? 'border-red-500' : ''}
                    />
                    {dimensionsForm.formState.errors.height && (
                      <p className="text-sm text-red-600">{dimensionsForm.formState.errors.height.message}</p>
                    )}
                  </div>
                </div>

                {(category === 'porta-garage' || category === 'scuri') && (
                  <div className="space-y-2">
                    <Label htmlFor="depth">Profondità (cm)</Label>
                    <Input
                      id="depth"
                      type="number"
                      {...dimensionsForm.register('depth', { valueAsNumber: true })}
                      className={dimensionsForm.formState.errors.depth ? 'border-red-500' : ''}
                    />
                    {dimensionsForm.formState.errors.depth && (
                      <p className="text-sm text-red-600">{dimensionsForm.formState.errors.depth.message}</p>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center pt-4">
                  <div className="text-sm text-gray-500">
                    Dimensioni: {dimensionsForm.watch('width') || 0} × {dimensionsForm.watch('height') || 0}
                    {(dimensionsForm.watch('depth') || 0) > 0 && ` × ${dimensionsForm.watch('depth')}`} cm
                  </div>
                  <Button type="submit">
                    Salva Dimensioni
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Colori */}
        {activeTab === 'colors' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Scelta Colori</span>
              </CardTitle>
              <CardDescription>
                Seleziona i colori per esterno, interno e profili
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={colorsForm.handleSubmit(handleColorsSubmit)} className="space-y-6">
                {/* Esterno */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Colore Esterno</Label>
                  <div className="grid grid-cols-5 gap-3">
                    {availableColors.map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => colorsForm.setValue('esterno', color.id)}
                        className={`relative p-3 rounded-lg border-2 transition-all ${
                          colorsForm.watch('esterno') === color.id
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className="w-full h-8 rounded"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-xs mt-1 block text-center">{color.name}</span>
                        {colorsForm.watch('esterno') === color.id && (
                          <Check className="absolute top-1 right-1 w-4 h-4 text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interno */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Colore Interno</Label>
                  <div className="grid grid-cols-5 gap-3">
                    {availableColors.map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => colorsForm.setValue('interno', color.id)}
                        className={`relative p-3 rounded-lg border-2 transition-all ${
                          colorsForm.watch('interno') === color.id
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className="w-full h-8 rounded"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-xs mt-1 block text-center">{color.name}</span>
                        {colorsForm.watch('interno') === color.id && (
                          <Check className="absolute top-1 right-1 w-4 h-4 text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Profili */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Colore Profili</Label>
                  <div className="grid grid-cols-5 gap-3">
                    {availableColors.map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => colorsForm.setValue('profili', color.id)}
                        className={`relative p-3 rounded-lg border-2 transition-all ${
                          colorsForm.watch('profili') === color.id
                            ? 'border-blue-500 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className="w-full h-8 rounded"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-xs mt-1 block text-center">{color.name}</span>
                        {colorsForm.watch('profili') === color.id && (
                          <Check className="absolute top-1 right-1 w-4 h-4 text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit">
                    Salva Colori
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Tipo di Vetro */}
        {activeTab === 'glass' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Tipo di Vetro</span>
              </CardTitle>
              <CardDescription>
                Scegli il tipo di vetro più adatto alle tue esigenze
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {glassTypes.map((glass) => (
                  <button
                    key={glass.id}
                    onClick={() => handleGlassSelect(glass.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedGlass === glass.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{glass.name}</h4>
                      <div className="flex items-center space-x-2">
                        {glass.price > 0 && (
                          <span className="text-sm font-medium text-green-600">
                            +€{glass.price}
                          </span>
                        )}
                        {selectedGlass === glass.id && (
                          <Check className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{glass.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Accessori */}
        {activeTab === 'accessories' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Accessori Opzionali</span>
              </CardTitle>
              <CardDescription>
                Aggiungi accessori per personalizzare ulteriormente il tuo serramento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {accessories.map((accessory) => {
                  const isSelected = selectedAccessories.includes(accessory.id);

                  return (
                    <div
                      key={accessory.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{accessory.name}</h4>
                        <span className="text-sm font-medium text-green-600">
                          €{accessory.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 capitalize">
                          {accessory.category}
                        </span>
                        <Button
                          size="sm"
                          variant={isSelected ? "destructive" : "default"}
                          onClick={() => {
                            if (isSelected) {
                              removeAccessory(accessory.id);
                            } else {
                              addAccessory(accessory.id);
                            }
                          }}
                        >
                          {isSelected ? (
                            <>
                              <Minus className="w-4 h-4 mr-1" />
                              Rimuovi
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-1" />
                              Aggiungi
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pulsante continua */}
      {isStepValid && (
        <div className="text-center mt-8">
          <Button
            onClick={handleContinue}
            size="lg"
            className="px-8 py-3 text-lg"
          >
            Vai all&apos;Anteprima
          </Button>
        </div>
      )}

      {!isStepValid && (
        <div className="text-center mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 mx-auto mb-2" />
          <p className="text-sm text-yellow-800">
            Completa tutti i passaggi per procedere con l&apos;anteprima
          </p>
        </div>
      )}
    </div>
  );
}
