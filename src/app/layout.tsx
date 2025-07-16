import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import { store } from '@/store';
import { AuthProvider } from '@/lib/auth/AuthProvider';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Northlight Analytics - Gazelle Phase 5',
  description: 'Advanced analytics platform for retail and consumer goods',
  keywords: ['analytics', 'retail', 'consumer goods', 'insights', 'data'],
  authors: [{ name: 'Northlight Analytics' }],
  openGraph: {
    title: 'Northlight Analytics - Gazelle Phase 5',
    description: 'Advanced analytics platform for retail and consumer goods',
    url: 'https://northlightanalytics.com',
    siteName: 'Northlight Analytics',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Northlight Analytics',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Northlight Analytics - Gazelle Phase 5',
    description: 'Advanced analytics platform for retail and consumer goods',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
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
        </ErrorBoundary>
      </body>
    </html>
  );
} 