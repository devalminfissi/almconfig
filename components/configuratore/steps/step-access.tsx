'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GuestForm } from '../auth/guest-form';
import { LoginForm } from '../auth/login-form';
import { RegisterForm } from '../auth/register-form';
import { useWizardStore } from '@/lib/stores/wizard-store';
import { GuestData, User } from '@/lib/types';
import { User as UserIcon, Users, LogIn, UserPlus } from 'lucide-react';

type AuthMode = 'choice' | 'guest' | 'login' | 'register';

export function StepAccess() {
  const [authMode, setAuthMode] = useState<AuthMode>('choice');
  const { setGuestData, setUser, setGuestMode, nextStep } = useWizardStore();

  const handleGuestSubmit = (data: GuestData) => {
    setGuestData(data);
    setGuestMode(true);
    nextStep();
  };

  const handleUserLogin = (user: User) => {
    setUser(user);
    setGuestMode(false);
    nextStep();
  };

  const handleUserRegister = (user: User) => {
    setUser(user);
    setGuestMode(false);
    nextStep();
  };

  if (authMode === 'guest') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <Button
            variant="ghost"
            onClick={() => setAuthMode('choice')}
            className="mb-4"
          >
            ← Torna alla scelta
          </Button>
        </div>
        <GuestForm onSubmit={handleGuestSubmit} />
      </div>
    );
  }

  if (authMode === 'login') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <Button
            variant="ghost"
            onClick={() => setAuthMode('choice')}
            className="mb-4"
          >
            ← Torna alla scelta
          </Button>
        </div>
        <LoginForm
          onSuccess={handleUserLogin}
          onSwitchToRegister={() => setAuthMode('register')}
        />
      </div>
    );
  }

  if (authMode === 'register') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <Button
            variant="ghost"
            onClick={() => setAuthMode('choice')}
            className="mb-4"
          >
            ← Torna alla scelta
          </Button>
        </div>
        <RegisterForm
          onSuccess={handleUserRegister}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Come vuoi procedere?
        </h2>
        <p className="text-gray-600">
          Scegli come accedere al configuratore serramenti
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Guest Option */}
        <Card
          className="cursor-pointer transition-all hover:shadow-lg hover:border-blue-300"
          onClick={() => setAuthMode('guest')}
        >
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-xl">Continua come Ospite</CardTitle>
            <CardDescription>
              Configura il tuo serramento senza registrarti
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ Accesso immediato</li>
              <li>✅ Configurazione guidata</li>
              <li>✅ Richiesta preventivo gratuita</li>
              <li>⚠️ Dati non salvati automaticamente</li>
            </ul>
            <Button className="w-full mt-6">
              Continua come Ospite
            </Button>
          </CardContent>
        </Card>

        {/* Registered User Option */}
        <Card
          className="cursor-pointer transition-all hover:shadow-lg hover:border-green-300"
          onClick={() => setAuthMode('login')}
        >
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <UserIcon className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle className="text-xl">Accedi / Registrati</CardTitle>
            <CardDescription>
              Accedi al tuo account per salvare e recuperare configurazioni
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ Salvataggio automatico</li>
              <li>✅ Recupero configurazioni</li>
              <li>✅ Storico configurazioni</li>
              <li>✅ Supporto prioritario</li>
            </ul>
            <div className="space-y-3 mt-6">
              <Button
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setAuthMode('login');
                }}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Accedi
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setAuthMode('register');
                }}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Registrati
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-8 text-sm text-gray-500">
        <p>
          Tutti i dati sono trattati in conformità al GDPR e alla privacy policy.
        </p>
      </div>
    </div>
  );
}
