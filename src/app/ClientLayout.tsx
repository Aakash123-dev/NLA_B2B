// app/ClientLayout.tsx
'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

import { store } from '@/store';
import { AuthProvider } from '@/components';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <div className="min-h-screen bg-background font-sans antialiased">
            {children}
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}
