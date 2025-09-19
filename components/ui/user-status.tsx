'use client';

import React from 'react';
import { UserDropdown } from './user-dropdown';

export function UserStatus() {
  return (
    <div className="flex items-center space-x-3">
      <UserDropdown />
    </div>
  );
}
