'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function AuthCodeErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const description = searchParams.get('description');

  const getErrorMessage = () => {
    switch (error) {
      case 'access_denied':
        return 'Accesso negato. Hai annullato l\'autorizzazione su Google.';
      case 'exchange_failed':
        return 'Errore durante lo scambio del codice di autorizzazione.';
      case 'no_code':
        return 'Nessun codice di autorizzazione ricevuto da Google.';
      default:
        return description || 'Si è verificato un errore durante l\'autenticazione.';
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900">Errore di Autenticazione</CardTitle>
          <CardDescription>
            {getErrorMessage()}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Possibili cause:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Hai annullato l&apos;accesso su Google</li>
              <li>• La sessione è scaduta</li>
              <li>• Problemi di connessione temporanei</li>
              <li>• Configurazione OAuth non completata</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Torna alla Home
              </Link>
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Riprova
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Se il problema persiste, prova ad accedere con email e password</p>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Accedi con email
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthCodeErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600 animate-pulse" />
            </div>
            <CardTitle className="text-2xl text-gray-900">Caricamento...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    }>
      <AuthCodeErrorContent />
    </Suspense>
  );
}
