'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Log error to monitoring service
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Add your error reporting service here
      // e.g., Sentry, LogRocket, etc.
    }

    this.setState({
      error,
      errorInfo,
    });
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error!}
            resetError={this.resetError}
          />
        );
      }

      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="mb-6 flex justify-center">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="mb-4 text-2xl font-bold text-destructive">
              Something went wrong
            </h1>
            <p className="mb-6 text-muted-foreground">
              We're sorry, but something unexpected happened. Please try
              refreshing the page or contact support if the problem persists.
            </p>
            <div className="flex flex-col items-center space-y-4">
              <button
                onClick={this.resetError}
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try again
              </button>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 w-full max-w-2xl">
                  <summary className="cursor-pointer text-sm font-medium text-muted-foreground">
                    Error details (dev only)
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap rounded-md bg-muted p-4 text-xs text-muted-foreground">
                    {this.state.error.message}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary for functional components
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  if (error) {
    throw error;
  }

  return { captureError, resetError };
}

// Simple error fallback component
export function SimpleErrorFallback({
  error,
  resetError,
}: {
  error: Error;
  resetError: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
      <div className="rounded-lg border bg-card p-6 text-center shadow-sm">
        <AlertTriangle className="mx-auto mb-4 h-8 w-8 text-destructive" />
        <h2 className="mb-2 text-lg font-semibold">Something went wrong</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={resetError}
          className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
} 