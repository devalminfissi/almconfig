import { z } from 'zod';

// Guest form validation
export const guestFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Il nome deve contenere almeno 2 caratteri')
    .max(50, 'Il nome non può superare i 50 caratteri')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Il nome può contenere solo lettere, spazi, apostrofi e trattini'),

  lastName: z
    .string()
    .min(2, 'Il cognome deve contenere almeno 2 caratteri')
    .max(50, 'Il cognome non può superare i 50 caratteri')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Il cognome può contenere solo lettere, spazi, apostrofi e trattini'),

  email: z
    .string()
    .email('Inserisci un indirizzo email valido')
    .max(100, 'L\'email non può superare i 100 caratteri'),

  phone: z
    .string()
    .min(10, 'Il numero di telefono deve contenere almeno 10 caratteri')
    .max(15, 'Il numero di telefono non può superare i 15 caratteri')
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Inserisci un numero di telefono valido')
});

// Dimensions form validation
export const dimensionsSchema = z.object({
  width: z
    .number()
    .min(30, 'La larghezza minima è 30 cm')
    .max(500, 'La larghezza massima è 500 cm'),

  height: z
    .number()
    .min(30, 'L\'altezza minima è 30 cm')
    .max(400, 'L\'altezza massima è 400 cm'),

  depth: z
    .number()
    .min(1, 'La profondità minima è 1 cm')
    .max(50, 'La profondità massima è 50 cm')
    .optional()
});

// Colors form validation
export const colorsSchema = z.object({
  esterno: z.string().min(1, 'Seleziona un colore esterno'),
  interno: z.string().min(1, 'Seleziona un colore interno'),
  profili: z.string().min(1, 'Seleziona un colore per i profili')
});

// Login form validation
export const loginSchema = z.object({
  email: z.string().email('Inserisci un indirizzo email valido'),
  password: z.string().min(6, 'La password deve contenere almeno 6 caratteri')
});

// Register form validation
export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Il nome deve contenere almeno 2 caratteri')
    .max(50, 'Il nome non può superare i 50 caratteri'),

  lastName: z
    .string()
    .min(2, 'Il cognome deve contenere almeno 2 caratteri')
    .max(50, 'Il cognome non può superare i 50 caratteri'),

  email: z.string().email('Inserisci un indirizzo email valido'),

  phone: z
    .string()
    .min(10, 'Il numero di telefono deve contenere almeno 10 caratteri')
    .max(15, 'Il numero di telefono non può superare i 15 caratteri')
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Inserisci un numero di telefono valido'),

  password: z
    .string()
    .min(8, 'La password deve contenere almeno 8 caratteri')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La password deve contenere almeno una lettera minuscola, una maiuscola e un numero'),

  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Le password non coincidono',
  path: ['confirmPassword']
});

// Quote request validation
export const quoteRequestSchema = z.object({
  notes: z
    .string()
    .max(500, 'Le note non possono superare i 500 caratteri')
    .optional()
});

// Export types
export type GuestFormData = z.infer<typeof guestFormSchema>;
export type DimensionsData = z.infer<typeof dimensionsSchema>;
export type ColorsData = z.infer<typeof colorsSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type QuoteRequestData = z.infer<typeof quoteRequestSchema>;
