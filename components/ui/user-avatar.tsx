import React from 'react';
import { User } from 'lucide-react';

interface UserAvatarProps {
  name?: string;
  email?: string;
  isLoggedIn?: boolean;
  className?: string;
}

export function UserAvatar({ 
  name = 'Admin', 
  email, 
  isLoggedIn = true, 
  className = '' 
}: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`flex items-center space-x-2 bg-gray-50 rounded-full px-3 py-2 hover:bg-gray-100 transition-colors ${className}`}>
      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
        {isLoggedIn ? (
          <span className="text-white text-sm font-medium">{initials}</span>
        ) : (
          <User className="w-4 h-4 text-white" />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-gray-700 font-medium">{name}</span>
        {email && (
          <span className="text-xs text-gray-500">{email}</span>
        )}
      </div>
    </div>
  );
}
