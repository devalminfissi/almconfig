'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import {
  Shield,
  CheckCircle,
  Calculator,
  Palette,
  Truck,
  Star,
  Award,
  Users,
  Home,
  Wrench,
  Phone,
  MapPin
} from 'lucide-react';

export function AuthRequired() {
  // Questo componente ora serve solo come landing page
  // L'autenticazione vera e propria avviene tramite la navbar


  // Landing Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <Logo width={200} height={100} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Il Tuo Serramento
              <span className="text-blue-600 block">Su Misura</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Configura il tuo serramento personalizzato con ALM Infissi.
              <strong className="text-blue-600"> Ricevi il tuo preventivo gratuito </strong>
              in pochi minuti e trasforma la tua casa con soluzioni su misura.
            </p>
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">
                Usa il pulsante <strong className="text-blue-600">Accedi</strong> in alto a destra per iniziare
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Configurazione Guidata</h3>
                <p className="text-gray-600">
                  Scegli materiali, colori e accessori con il nostro configuratore intuitivo.
                  Ogni passo è guidato per garantirti il risultato perfetto.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Calculator className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Preventivo Istantaneo</h3>
                <p className="text-gray-600">
                  Ricevi il tuo preventivo dettagliato in tempo reale mentre configuri.
                  Trasparente, senza sorprese, con prezzi chiari e competitivi.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Installazione Professionale</h3>
                <p className="text-gray-600">
                  Il nostro team di esperti si occupa dell&apos;installazione con massima cura
                  e precisione, garantendo un servizio completo chiavi in mano.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Services Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tutto Quello che Ti Serve
              </h2>
              <p className="text-xl text-gray-600">
                Serramenti di qualità per ogni esigenza
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Finestre</h3>
                  <p className="text-gray-600 text-sm">Finestre su misura per ogni ambiente domestico</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Porte Finestra</h3>
                  <p className="text-gray-600 text-sm">Accesso diretto al balcone con massima sicurezza</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Porte Garage</h3>
                  <p className="text-gray-600 text-sm">Automazioni moderne per il tuo garage</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Palette className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Persiane</h3>
                  <p className="text-gray-600 text-sm">Regolazione della luce e privacy su misura</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Tapparelle</h3>
                  <p className="text-gray-600 text-sm">Controllo totale della luce e isolamento termico</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Materiali Premium</h3>
                  <p className="text-gray-600 text-sm">PVC e Alluminio di qualità superiore</p>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Perché Scegliere ALM Infissi?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Esperienza Decennale</h3>
                    <p className="text-gray-600">Oltre 10 anni di esperienza nel settore dei serramenti</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Installazione Inclusa</h3>
                    <p className="text-gray-600">Servizio completo con installazione professionale</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Garanzia 10 Anni</h3>
                    <p className="text-gray-600">Garanzia completa sui materiali e sull&apos;installazione</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Assistenza Post-Vendita</h3>
                    <p className="text-gray-600">Supporto tecnico continuo anche dopo l&apos;installazione</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <div className="text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-blue-200" />
                <h3 className="text-2xl font-bold mb-4">+500 Clienti Soddisfatti</h3>
                <p className="mb-6 text-blue-100">
                  Unisciti alla nostra comunità di clienti soddisfatti che hanno scelto
                  ALM Infissi per i loro serramenti su misura.
                </p>
                <div className="text-center mt-4">
                  <p className="text-sm text-blue-100">
                    Usa il pulsante <strong>Accedi</strong> nella barra di navigazione per iniziare il tuo progetto
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Pronto a Trasformare la Tua Casa?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Configura il tuo serramento ideale e ricevi il tuo preventivo gratuito in pochi minuti.
            </p>
            <div className="text-center">
              <p className="text-lg text-blue-100">
                Clicca su <strong className="text-white">Accedi</strong> nella barra di navigazione superiore per iniziare il tuo preventivo gratuito
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 text-gray-500">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Palermo e Provincia</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+39 320 123 4567</span>
              </div>
            </div>
            <p className="text-sm">
              Tutti i dati sono trattati in conformità al GDPR e alla privacy policy.
              <br />
              ALM Infissi di Alessandro Cappello - P.IVA: 06365120820
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
