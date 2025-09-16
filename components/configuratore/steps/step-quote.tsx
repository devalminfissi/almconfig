'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useWizardStore } from '@/lib/stores/wizard-store';
import { quoteRequestSchema, type QuoteRequestData } from '@/lib/validations';
import { supabase } from '@/lib/supabase';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  Mail,
  Phone,
  User
} from 'lucide-react';

export function StepQuote() {
  const {
    configurationId,
    material,
    category,
    dimensions,
    colors,
    glassType,
    accessories,
    guestData,
    user,
    setCompleted
  } = useWizardStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<QuoteRequestData>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      notes: ''
    }
  });

  const watchedNotes = watch('notes');

  const onSubmit = async (data: QuoteRequestData) => {
    if (!configurationId) {
      setError('Configurazione non trovata. Riprova.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Crea la richiesta di preventivo nel database
      const { error: quoteError } = await supabase
        .from('quote_requests')
        .insert([{
          configuration_id: configurationId,
          status: 'pending',
          notes: data.notes || null
        }]);

      if (quoteError) throw quoteError;

      // Aggiorna lo stato della configurazione
      setCompleted(true);
      setIsSubmitted(true);

      // Qui potresti anche inviare un'email di notifica
      // o integrare con un servizio di email come Resend

    } catch (error: unknown) {
      console.error('Error submitting quote request:', error);
      setError(error instanceof Error ? error.message : 'Errore durante l&apos;invio della richiesta');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Richiesta Inviata!
              </h2>

              <p className="text-gray-600 mb-6">
                La tua richiesta di preventivo è stata inviata con successo.
                Riceverai una risposta entro 24-48 ore.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Cosa succede ora?</h3>
                <ul className="text-sm text-gray-600 space-y-1 text-left">
                  <li>• Analizzeremo la tua configurazione</li>
                  <li>• Ti contatteremo per eventuali chiarimenti</li>
                  <li>• Riceverai un preventivo dettagliato via email</li>
                  <li>• Potremo organizzare un sopralluogo se necessario</li>
                </ul>
              </div>

              <div className="text-sm text-gray-500">
                <p>Hai domande? Contattaci:</p>
                <p className="mt-1">
                  📧 info@bemyrider.com | 📞 +39 123 456 7890
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Richiedi il tuo Preventivo
        </h2>
        <p className="text-gray-600">
          Invia la tua configurazione e ricevi un preventivo personalizzato
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form richiesta preventivo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Send className="w-5 h-5" />
              <span>Dettagli Richiesta</span>
            </CardTitle>
            <CardDescription>
              Aggiungi eventuali note specifiche per la tua richiesta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Informazioni cliente */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Informazioni Cliente</h4>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>
                      {user ? `${user.firstName} ${user.lastName}` : `${guestData?.firstName} ${guestData?.lastName}`}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>
                      {user ? user.email : guestData?.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>
                      {user ? user.phone : guestData?.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Note aggiuntive */}
              <div className="space-y-2">
                <Label htmlFor="notes">Note aggiuntive (opzionale)</Label>
                <textarea
                  id="notes"
                  {...register('notes')}
                  placeholder="Specifiche particolari, urgenza, preferenze di installazione..."
                  className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  maxLength={500}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Note utili: tempi di consegna, esigenze particolari, ecc.</span>
                  <span>{watchedNotes?.length || 0}/500</span>
                </div>
                {errors.notes && (
                  <p className="text-sm text-red-600">{errors.notes.message}</p>
                )}
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-5 h-5 mr-2 animate-spin" />
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Invia Richiesta Preventivo
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Riepilogo configurazione */}
        <Card>
          <CardHeader>
            <CardTitle>Riepilogo Configurazione</CardTitle>
            <CardDescription>
              Verifica i dettagli prima dell&apos;invio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
                    {dimensions ? `${dimensions.width} × ${dimensions.height} cm` : 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Vetro:</span>
                  <p className="text-gray-900">{glassType || 'Standard'}</p>
                </div>
              </div>

              {colors && (
                <div>
                  <span className="font-medium text-gray-700">Colori:</span>
                  <div className="mt-1 text-sm text-gray-600">
                    <p>Esterno: {colors.esterno}</p>
                    <p>Interno: {colors.interno}</p>
                    <p>Profili: {colors.profili}</p>
                  </div>
                </div>
              )}

              {accessories && accessories.length > 0 && (
                <div>
                  <span className="font-medium text-gray-700">Accessori:</span>
                  <p className="text-sm text-gray-600 mt-1">
                    {accessories.length} accessorio{accessories.length > 1 ? 'i' : ''} selezionato{accessories.length > 1 ? 'i' : ''}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Risposta entro 24-48 ore</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Preventivo gratuito e senza impegno</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informazioni aggiuntive */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-medium mb-1">Tempi Rapidi</h3>
            <p className="text-sm text-gray-600">
              Risposta entro 24-48 ore lavorative
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-medium mb-1">Senza Impegno</h3>
            <p className="text-sm text-gray-600">
              Preventivo gratuito, nessuna obbligazione
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <User className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-medium mb-1">Consulenza</h3>
            <p className="text-sm text-gray-600">
              Supporto tecnico specializzato
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
