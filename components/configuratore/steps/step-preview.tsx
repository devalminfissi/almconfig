'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWizardStore } from '@/lib/stores/wizard-store';
import { formatCurrency, formatDimensions } from '@/lib/utils';
import {
  Eye,
  Edit,
  CheckCircle,
  AlertTriangle,
  Calculator,
  FileText
} from 'lucide-react';

const glassTypes = {
  singolo: { name: 'Vetro Singolo', price: 0 },
  doppio: { name: 'Vetro Doppio', price: 50 },
  triplo: { name: 'Vetro Triplo', price: 120 },
  antisfondamento: { name: 'Antisfondamento', price: 80 },
  acustico: { name: 'Acustico', price: 90 },
  termico: { name: 'Termico', price: 100 }
};

const accessories = {
  'maniglia-standard': { name: 'Maniglia Standard', price: 25 },
  'maniglia-premium': { name: 'Maniglia Premium', price: 45 },
  'serratura-sicurezza': { name: 'Serratura di Sicurezza', price: 35 },
  'fermaglio': { name: 'Fermaglio', price: 15 },
  'zanzariera': { name: 'Zanzariera', price: 60 },
  'tenda-interna': { name: 'Tenda Interna', price: 40 }
};

const colors = {
  bianco: { name: 'Bianco', hex: '#FFFFFF' },
  nero: { name: 'Nero', hex: '#000000' },
  'grigio-chiaro': { name: 'Grigio Chiaro', hex: '#D1D5DB' },
  'grigio-scuro': { name: 'Grigio Scuro', hex: '#4B5563' },
  marrone: { name: 'Marrone', hex: '#92400E' },
  blu: { name: 'Blu', hex: '#3B82F6' },
  verde: { name: 'Verde', hex: '#10B981' },
  rosso: { name: 'Rosso', hex: '#EF4444' },
  beige: { name: 'Beige', hex: '#F5F5DC' },
  antracite: { name: 'Antracite', hex: '#2D3748' }
};

export function StepPreview() {
  const {
    material,
    category,
    dimensions,
    colors: selectedColors,
    glassType,
    accessories: selectedAccessories,
    guestData,
    user,
    nextStep,
    prevStep
  } = useWizardStore();

  // Calcolo prezzo totale
  const basePrice = material === 'pvc' ? 150 : 280;
  const glassPrice = glassType ? glassTypes[glassType].price : 0;
  const accessoriesPrice = selectedAccessories.reduce((sum, acc) => {
    return sum + (accessories[acc as keyof typeof accessories]?.price || 0);
  }, 0);

  const totalPrice = basePrice + glassPrice + accessoriesPrice;
  const area = dimensions ? (dimensions.width * dimensions.height) / 10000 : 0; // in metri quadri
  const totalPriceWithArea = totalPrice * area;

  const renderColorSwatch = (colorId: string) => {
    const color = colors[colorId as keyof typeof colors];
    return (
      <div className="flex items-center space-x-2">
        <div
          className="w-4 h-4 rounded border border-gray-300"
          style={{ backgroundColor: color?.hex || '#FFFFFF' }}
        />
        <span className="text-sm">{color?.name || colorId}</span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Anteprima Configurazione
        </h2>
        <p className="text-gray-600">
          Verifica la tua configurazione prima di richiedere il preventivo
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Anteprima Visuale */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Anteprima del Serramento</span>
              </CardTitle>
              <CardDescription>
                Rappresentazione grafica della tua configurazione
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-lg shadow-lg flex items-center justify-center">
                    <Eye className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">
                    Anteprima 3D del serramento
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Disponibile nella versione completa
                  </p>
                </div>
              </div>

              {/* Dettagli configurazione */}
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Materiale:</span>
                    <p className="text-gray-900">{material?.toUpperCase()}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Categoria:</span>
                    <p className="text-gray-900 capitalize">{category?.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Dimensioni:</span>
                    <p className="text-gray-900">
                      {dimensions ? formatDimensions(dimensions) : 'Non specificate'}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Tipo Vetro:</span>
                    <p className="text-gray-900">
                      {glassType ? glassTypes[glassType].name : 'Non selezionato'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Riepilogo e Prezzi */}
        <div className="space-y-6">
          {/* Riepilogo Configurazione */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Riepilogo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Colori */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Colori</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Esterno:</span>
                    {selectedColors && renderColorSwatch(selectedColors.esterno)}
                  </div>
                  <div className="flex justify-between">
                    <span>Interno:</span>
                    {selectedColors && renderColorSwatch(selectedColors.interno)}
                  </div>
                  <div className="flex justify-between">
                    <span>Profili:</span>
                    {selectedColors && renderColorSwatch(selectedColors.profili)}
                  </div>
                </div>
              </div>

              {/* Accessori */}
              {selectedAccessories.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Accessori</h4>
                  <div className="space-y-1 text-sm">
                    {selectedAccessories.map((acc) => (
                      <div key={acc} className="flex justify-between">
                        <span>{accessories[acc as keyof typeof accessories]?.name || acc}</span>
                        <span className="text-green-600">
                          +{formatCurrency(accessories[acc as keyof typeof accessories]?.price || 0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cliente */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Cliente</h4>
                <div className="text-sm text-gray-600">
                  {user ? (
                    <div>
                      <p>{user.firstName} {user.lastName}</p>
                      <p>{user.email}</p>
                      <p>{user.phone}</p>
                    </div>
                  ) : guestData ? (
                    <div>
                      <p>{guestData.firstName} {guestData.lastName}</p>
                      <p>{guestData.email}</p>
                      <p>{guestData.phone}</p>
                    </div>
                  ) : (
                    <p>Informazioni cliente non disponibili</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calcolo Prezzi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5" />
                <span>Preventivo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Prezzo base ({material?.toUpperCase()}):</span>
                  <span>{formatCurrency(basePrice)}/mq</span>
                </div>

                {glassType && glassPrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Vetro {glassTypes[glassType].name}:</span>
                    <span>{formatCurrency(glassPrice)}/mq</span>
                  </div>
                )}

                {accessoriesPrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Accessori:</span>
                    <span>{formatCurrency(accessoriesPrice)}/mq</span>
                  </div>
                )}

                <hr className="my-3" />

                <div className="flex justify-between font-medium">
                  <span>Totale al mq:</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>

                {area > 0 && (
                  <>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Superficie:</span>
                      <span>{area.toFixed(2)} mq</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Prezzo totale:</span>
                      <span className="text-green-600">{formatCurrency(totalPriceWithArea)}</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Azioni */}
          <div className="space-y-3">
            <Button
              onClick={nextStep}
              className="w-full"
              size="lg"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Richiedi Preventivo
            </Button>

            <Button
              onClick={prevStep}
              variant="outline"
              className="w-full"
            >
              <Edit className="w-5 h-5 mr-2" />
              Modifica Configurazione
            </Button>
          </div>

          {/* Avvertenza */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p>
                  Il prezzo mostrato è indicativo e può variare in base a specifiche tecniche
                  e condizioni di installazione. Il preventivo finale verrà fornito dopo
                  un sopralluogo tecnico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
