
export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface SupabaseUser {
  id: string;
  email?: string;
  user_metadata?: {
    firstName?: string;
    given_name?: string;
    name?: string;
    lastName?: string;
    family_name?: string;
    phone?: string;
  };
}

/**
 * Extract user data from Supabase user object with consistent fallback logic
 * Handles different OAuth providers (Google, etc.) and regular auth
 */
export function extractUserData(user: SupabaseUser): AuthUser {
  return {
    id: user.id,
    email: user.email || '',
    firstName: user.user_metadata?.firstName ||
               user.user_metadata?.given_name ||
               user.user_metadata?.name?.split(' ')[0] || '',
    lastName: user.user_metadata?.lastName ||
              user.user_metadata?.family_name ||
              user.user_metadata?.name?.split(' ').slice(1).join(' ') || '',
    phone: user.user_metadata?.phone || '',
  };
}

/**
 * Standardized logging for authentication events
 */
export const authLogger = {
  login: (email: string, method: string = 'password') => {
    console.log(`[AUTH] Login attempt - Email: ${email}, Method: ${method}`);
  },

  loginSuccess: (userId: string, email: string, method: string = 'password') => {
    console.log(`[AUTH] Login successful - User: ${userId}, Email: ${email}, Method: ${method}`);
  },

  loginError: (email: string, error: string, method: string = 'password') => {
    console.error(`[AUTH] Login failed - Email: ${email}, Method: ${method}, Error: ${error}`);
  },

  register: (email: string) => {
    console.log(`[AUTH] Registration attempt - Email: ${email}`);
  },

  registerSuccess: (userId: string, email: string) => {
    console.log(`[AUTH] Registration successful - User: ${userId}, Email: ${email}`);
  },

  registerError: (email: string, error: string) => {
    console.error(`[AUTH] Registration failed - Email: ${email}, Error: ${error}`);
  },

  oauthStart: (provider: string) => {
    console.log(`[AUTH] OAuth initiated - Provider: ${provider}`);
  },

  oauthSuccess: (userId: string, email: string, provider: string) => {
    console.log(`[AUTH] OAuth successful - User: ${userId}, Email: ${email}, Provider: ${provider}`);
  },

  oauthError: (provider: string, error: string) => {
    console.error(`[AUTH] OAuth failed - Provider: ${provider}, Error: ${error}`);
  },

  logout: (userId?: string) => {
    console.log(`[AUTH] Logout initiated${userId ? ` - User: ${userId}` : ''}`);
  },

  logoutSuccess: (userId?: string) => {
    console.log(`[AUTH] Logout successful${userId ? ` - User: ${userId}` : ''}`);
  },

  logoutError: (error: string, userId?: string) => {
    console.error(`[AUTH] Logout failed${userId ? ` - User: ${userId}` : ''}, Error: ${error}`);
  },

  sessionCheck: (userId: string, email: string) => {
    console.log(`[AUTH] Session restored - User: ${userId}, Email: ${email}`);
  },

  sessionError: (error: string) => {
    console.error(`[AUTH] Session check failed - Error: ${error}`);
  }
};

/**
 * Standardized error message mapping for auth errors
 */
export const authErrorMessages = {
  // Login errors
  invalidCredentials: 'Email o password non corretti. Verifica le tue credenziali e riprova.',
  emailNotConfirmed: 'Email non confermata. Controlla la tua casella di posta e conferma il tuo account.',
  tooManyRequests: 'Troppi tentativi di accesso. Riprova tra qualche minuto.',
  networkError: 'Errore di connessione. Controlla la tua connessione internet e riprova.',

  // Registration errors
  userAlreadyExists: 'Un utente con questa email è già registrato. Prova ad accedere invece.',
  weakPassword: 'La password deve contenere almeno 8 caratteri, una lettera maiuscola, una minuscola e un numero.',
  invalidEmail: 'Indirizzo email non valido. Verifica il formato dell\'email.',
  registrationIncomplete: 'Registrazione completata ma dati utente non disponibili.',

  // OAuth errors
  oauthAccessDenied: 'Accesso negato. Hai annullato l\'autorizzazione.',
  oauthConfigError: 'Errore di configurazione OAuth. Controlla che l\'URL di callback sia configurato correttamente.',
  oauthNetworkError: 'Errore di connessione durante l\'autenticazione OAuth. Riprova più tardi.',

  // General errors
  unexpectedError: 'Errore imprevisto. Riprova più tardi.',
  signOutError: 'Errore durante il logout. Riprova.',

  // Success messages
  emailConfirmationRequired: 'Registrazione completata! Controlla la tua email per confermare l\'account prima di accedere.',
  logoutSuccess: 'Logout effettuato con successo.'
};

interface AuthError {
  message?: string;
}

/**
 * Parse Supabase auth error and return user-friendly message
 */
export function parseAuthError(error: AuthError | null | undefined, context: 'login' | 'register' | 'oauth' | 'logout' = 'login'): string {
  const errorMessage = error?.message || '';

  if (context === 'login') {
    if (errorMessage.includes('Invalid login credentials')) {
      return authErrorMessages.invalidCredentials;
    }
    if (errorMessage.includes('Email not confirmed')) {
      return authErrorMessages.emailNotConfirmed;
    }
    if (errorMessage.includes('Too many requests')) {
      return authErrorMessages.tooManyRequests;
    }
  }

  if (context === 'register') {
    if (errorMessage.includes('User already registered')) {
      return authErrorMessages.userAlreadyExists;
    }
    if (errorMessage.includes('Password should be at least')) {
      return authErrorMessages.weakPassword;
    }
    if (errorMessage.includes('Unable to validate email address')) {
      return authErrorMessages.invalidEmail;
    }
  }

  if (context === 'oauth') {
    if (errorMessage.includes('access_denied')) {
      return authErrorMessages.oauthAccessDenied;
    }
    if (errorMessage.includes('OAuth')) {
      return authErrorMessages.oauthConfigError;
    }
  }

  if (context === 'logout') {
    return authErrorMessages.signOutError;
  }

  return authErrorMessages.unexpectedError;
}
