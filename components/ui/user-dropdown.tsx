'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LogOut, Settings, ChevronDown, UserPlus, User, Mail, Lock } from 'lucide-react';
import { useWizardStore } from '@/lib/stores/wizard-store';
import { supabase } from '@/lib/supabase';
import { parseAuthError, authLogger, authErrorMessages } from '@/lib/utils/auth-helpers';

type AuthMode = 'choice' | 'login' | 'register';

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('choice');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, reset } = useWizardStore();

  // Determina le informazioni utente da mostrare
  const displayUser = user;
  const isLoggedIn = !!user;

  // Chiudi il dropdown quando si clicca fuori
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setAuthMode('choice'); // Reset auth mode quando si chiude
        setShowEmailForm(false); // Reset email form quando si chiude
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const currentUserId = user?.id;

    try {
      authLogger.logout(currentUserId);
      const { error } = await supabase.auth.signOut();

      if (error) {
        authLogger.logoutError(parseAuthError(error, 'logout'), currentUserId);
        alert(parseAuthError(error, 'logout'));
        return;
      }

      authLogger.logoutSuccess(currentUserId);
      // Reset local state after successful sign out
      reset();
      setIsOpen(false);
      setAuthMode('choice');
      setShowEmailForm(false);

      // Reindirizza alla home dopo il logout
      window.location.href = '/';
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      authLogger.logoutError(errorMessage, currentUserId);
      alert(authErrorMessages.signOutError);
    }
  };


  const handleGoogleLogin = async () => {
    try {
      authLogger.oauthStart('google');

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        authLogger.oauthError('google', error.message);
        alert(`Errore di autenticazione Google: ${parseAuthError(error, 'oauth')}\n\nControlla che l'URL di callback su Google Cloud Console sia configurato come: ${window.location.origin}/`);
      } else {
        authLogger.oauthSuccess('google', 'pending', 'google');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      authLogger.oauthError('google', errorMessage);
      alert(`Errore imprevisto durante l'autenticazione Google: ${errorMessage}\n\nControlla la connessione internet e la configurazione OAuth.`);
    }
  };


  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button per aprire il dropdown */}
      <button
        onClick={() => {
          if (isLoggedIn) {
            setIsOpen(!isOpen);
          } else {
            // Se non è loggato, apri direttamente il form di login
            setAuthMode('login');
            setIsOpen(true);
          }
        }}
        className={`flex items-center space-x-2 rounded-full px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isLoggedIn 
            ? 'bg-gray-50 hover:bg-gray-100' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isLoggedIn ? 'bg-blue-600' : 'bg-white'
        }`}>
          {isLoggedIn ? (
            <span className="text-white text-sm font-medium">
              {displayUser?.firstName?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          ) : (
            <User className={`w-4 h-4 ${isLoggedIn ? 'text-white' : 'text-blue-600'}`} />
          )}
        </div>
        <div className="flex flex-col items-start">
          <span className={`text-sm font-medium ${
            isLoggedIn ? 'text-gray-700' : 'text-white'
          }`}>
            {isLoggedIn ? `${displayUser?.firstName} ${displayUser?.lastName}` : 'Accedi'}
          </span>
          {isLoggedIn && displayUser?.email && (
            <span className="text-xs text-gray-500">{displayUser.email}</span>
          )}
        </div>
        <ChevronDown 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} ${
            isLoggedIn ? 'text-gray-500' : 'text-white'
          }`} 
        />
      </button>

      {/* Menu dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-4 z-50">
          {isLoggedIn ? (
            // Menu per utente loggato
            <>
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {displayUser?.firstName} {displayUser?.lastName}
                </p>
                <p className="text-xs text-gray-500">{displayUser?.email}</p>
              </div>
              
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Qui potresti aggiungere la logica per le impostazioni
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Impostazioni</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            // Form di autenticazione per utente non autenticato
            <>
              {authMode === 'login' ? (
                <div className="px-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Accedi al tuo Account</h3>
                    <span className="text-gray-400">→</span>
                  </div>
                  {showEmailForm ? (
                    // Form Email/Password completo
                    <div className="space-y-4">
                      <div className="text-center mb-4">
                        <button
                          onClick={() => setShowEmailForm(false)}
                          className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                        >
                          ← Torna indietro
                        </button>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </label>
                        <input
                          type="email"
                          placeholder="tua@email.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                          <Lock className="w-4 h-4" />
                          <span>Password</span>
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        Accedi
                      </button>

                      <div className="text-center">
                        <button
                          onClick={() => {
                            setAuthMode('register');
                            setShowEmailForm(false);
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Non hai un account? Registrati
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Vista semplificata con pulsanti
                    <div className="space-y-3">
                      {/* Google Login Button */}
                      <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span>Continua con Google</span>
                      </button>

                      {/* Accedi con Email Button */}
                      <button
                        onClick={() => setShowEmailForm(true)}
                        className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                        <span>Accedi con Email</span>
                      </button>

                      <div className="text-center">
                        <button
                          onClick={() => setAuthMode('register')}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Non hai un account? Registrati
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="px-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Registrati</h3>
                    <span className="text-gray-400">→</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <UserPlus className="w-4 h-4 text-gray-600" />
                    <h4 className="text-sm font-medium text-gray-700">Crea il tuo Account</h4>
                  </div>
                  {showEmailForm ? (
                    // Form di registrazione completo
                    <div className="space-y-4">
                      <div className="text-center mb-4">
                        <button
                          onClick={() => setShowEmailForm(false)}
                          className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                        >
                          ← Torna indietro
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Nome</label>
                          <input
                            type="text"
                            placeholder="Mario"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Cognome</label>
                          <input
                            type="text"
                            placeholder="Rossi"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </label>
                        <input
                          type="email"
                          placeholder="mario.rossi@email.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                          <span className="w-4 h-4 text-center">📞</span>
                          <span>Telefono</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="+39 333 123 4567"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                          <Lock className="w-4 h-4" />
                          <span>Password</span>
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                          <Lock className="w-4 h-4" />
                          <span>Conferma Password</span>
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        Registrati
                      </button>
                      <div className="text-center">
                        <button
                          onClick={() => {
                            setAuthMode('login');
                            setShowEmailForm(false);
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Hai già un account? Accedi
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Vista semplificata con pulsanti
                    <div className="space-y-3">
                      {/* Google Login Button */}
                      <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span>Continua con Google</span>
                      </button>

                      {/* Registrati con Email Button */}
                      <button
                        onClick={() => setShowEmailForm(true)}
                        className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <UserPlus className="w-5 h-5" />
                        <span>Registrati con Email</span>
                      </button>

                      <div className="text-center">
                        <button
                          onClick={() => setAuthMode('login')}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Hai già un account? Accedi
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}