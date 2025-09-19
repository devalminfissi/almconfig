'use client';

import React from 'react';
import { Logo } from './logo';
import { UserAvatar } from './user-avatar';
import { useWizardStore } from '@/lib/stores/wizard-store';

export function NavbarClient() {
  const { user } = useWizardStore();

  // Determina le informazioni utente da mostrare
  const displayUser = user;
  const isLoggedIn = !!user;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo a sinistra */}
          <div className="flex items-center">
            <Logo className="text-blue-600" width={80} height={40} />
          </div>
          
          {/* Stato utente a destra */}
          <div className="flex items-center space-x-3">
            {displayUser ? (
              <UserAvatar 
                name={`${displayUser.firstName} ${displayUser.lastName}`}
                email={displayUser.email}
                isLoggedIn={isLoggedIn}
              />
            ) : (
              <UserAvatar 
                name="Ospite"
                email=""
                isLoggedIn={false}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
