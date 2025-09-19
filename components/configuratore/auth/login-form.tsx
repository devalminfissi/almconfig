'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema, type LoginData } from '@/lib/validations';
import { supabase } from '@/lib/supabase';
import { parseAuthError, authLogger, extractUserData } from '@/lib/utils/auth-helpers';
import { LogIn, Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onSuccess: (user: { id: string; email: string; firstName: string; lastName: string; phone: string; created_at?: string }) => void;
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);

    try {
      authLogger.login(data.email, 'password');

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        const errorMessage = parseAuthError(authError, 'login');
        authLogger.loginError(data.email, errorMessage, 'password');
        setError(errorMessage);
        return;
      }

      if (authData.user) {
        const userData = extractUserData(authData.user);
        authLogger.loginSuccess(userData.id, userData.email, 'password');
        onSuccess(userData);
      } else {
        authLogger.loginError(data.email, 'Login succeeded but no user data returned', 'password');
        setError('Login completato ma dati utente non disponibili. Riprova.');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
      authLogger.loginError(data.email, errorMessage, 'password');
      setError('Errore imprevisto durante il login. Riprova più tardi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <LogIn className="w-5 h-5" />
          <span>Accedi al tuo Account</span>
        </CardTitle>
        <CardDescription>
          Accedi per recuperare le tue configurazioni salvate
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tua@email.com"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Password</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={isLoading}
          >
            {isLoading ? 'Accesso in corso...' : 'Accedi'}
          </Button>

          <div className="text-center mt-4">
            <Button
              type="button"
              variant="link"
              onClick={onSwitchToRegister}
              className="text-sm"
            >
              Non hai un account? Registrati
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
