'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { guestFormSchema, type GuestFormData } from '@/lib/validations';
import { User, Mail, Phone } from 'lucide-react';

interface GuestFormProps {
  onSubmit: (data: GuestFormData) => void;
}

export function GuestForm({ onSubmit }: GuestFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<GuestFormData>({
    resolver: zodResolver(guestFormSchema),
    mode: 'onChange'
  });

  const watchedValues = watch();

  const onFormSubmit = (data: GuestFormData) => {
    onSubmit(data);
  };

  const isFormValid = watchedValues.firstName &&
                     watchedValues.lastName &&
                     watchedValues.email &&
                     watchedValues.phone &&
                     Object.keys(errors).length === 0;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <User className="w-5 h-5" />
          <span>Continua come Ospite</span>
        </CardTitle>
        <CardDescription>
          Inserisci i tuoi dati per continuare con la configurazione
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nome *</Label>
              <Input
                id="firstName"
                placeholder="Mario"
                {...register('firstName')}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Cognome *</Label>
              <Input
                id="lastName"
                placeholder="Rossi"
                {...register('lastName')}
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email *</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="mario.rossi@email.com"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Telefono *</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+39 333 123 4567"
              {...register('phone')}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Caricamento...' : 'Continua con la Configurazione'}
          </Button>

          <p className="text-xs text-gray-500 text-center mt-4">
            * Campi obbligatori
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
