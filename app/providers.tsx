import React from 'react';
import { PrimeReactProvider } from 'primereact/api';

interface PrimeReactProviderProps {
  children: React.ReactNode;
}

export function Providers({ children }: PrimeReactProviderProps) {
  return (
    <PrimeReactProvider>
      {children}
    </PrimeReactProvider>
  );
}