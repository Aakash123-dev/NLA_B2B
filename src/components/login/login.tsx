'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertCircle,
  LockIcon,
  MailIcon,
  ArrowRight,
  User,
  KeyRound,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '../features';

export default function LoginPage() {
  const { login, error, isLoading, clearError, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Ensure page is fully loaded before rendering content
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (isLoginMode) {
      if (email && password) {
        await login(email, password);
      }
    } else {
      // For sign up mode, we'd typically call a register function
      // For now we'll just log in with the provided credentials
      if (email && password) {
        await login(email, password);
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    // This would be implemented to handle social login
    console.log(`Login with ${provider}`);
  };

  // Don't render content until page is fully loaded to avoid flashes
  if (!pageLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      {/* Full-screen background image with blur effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.png"
          alt="Background"
          fill
          className="object-cover"
          style={{ filter: 'blur(2px)' }}
          priority
        />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
      </div>

      {/* Login card container with animation */}
      <motion.div
        className="z-10 w-full max-w-md overflow-hidden rounded-xl bg-white/95 shadow-2xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Header with logo */}
        <div className="border-b border-slate-100 p-8 text-center">
          <motion.div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={40}
              height={40}
              className="object-contain"
              onError={() => {
                console.log('Logo failed to load');
              }}
            />
          </motion.div>
          <motion.h1
            className="mb-2 text-3xl font-bold text-slate-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {isLoginMode ? 'Welcome back' : 'Create account'}
          </motion.h1>
          <motion.p
            className="text-sm text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isLoginMode
              ? 'Sign in to access your dashboard'
              : 'Register to get started with our platform'}
          </motion.p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                className="flex items-center gap-2 rounded-md bg-red-50 p-4 text-sm text-red-800"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle className="h-4 w-4" />
                {error}
              </motion.div>
            )}

            {!isLoginMode && (
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-700"
                >
                  Full Name
                </Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <User size={18} />
                  </div>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLoginMode}
                    className="border-slate-200 py-6 pl-10 transition-all focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </motion.div>
            )}

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <MailIcon size={18} />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-slate-200 py-6 pl-10 transition-all focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </Label>
                {isLoginMode && (
                  <Link
                    href="#"
                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <LockIcon size={18} />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-slate-200 py-6 pl-10 transition-all focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {isLoginMode && (
                <div className="mt-2 flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-slate-600"
                  >
                    Remember me for 30 days
                  </label>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-2"
            >
              <Button
                type="submit"
                className="flex w-full items-center justify-center gap-2 bg-blue-600 py-6 transition-all duration-300 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <span>{isLoginMode ? 'Sign in' : 'Create account'}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </Button>
            </motion.div>

            <motion.div
              className="relative mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative">
                <span className="bg-white px-4 text-sm text-slate-500">
                  or continue with
                </span>
              </div>
            </motion.div>

            <motion.div
              className="mt-6 grid grid-cols-2 gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('google')}
                className="flex items-center justify-center gap-2 border-slate-300 py-5 transition-all hover:bg-slate-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                >
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm font-medium">Google</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialLogin('apple')}
                className="flex items-center justify-center gap-2 border-slate-300 py-5 transition-all hover:bg-slate-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 7c-3 0-4 3-4 5.5 0 3 2 7.5 4 7.5 1.088-.046 1.679-.5 3-.5 1.312 0 1.5.5 3 .5s4-3 4-5c-.028-.01-2.472-.403-2.5-3-.019-2.17 2.416-2.954 2.5-3-1.023-1.492-2.951-1.963-3.5-2-1.433-.111-2.83 1-3.5 1-.68 0-1.9-1-3-1z" />
                  <path d="M12 4a2 2 0 0 0 2-2 2 2 0 0 0-2 2" />
                </svg>
                <span className="text-sm font-medium">Apple</span>
              </Button>
            </motion.div>

            <motion.div
              className="pt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <p className="text-sm text-slate-600">
                {isLoginMode
                  ? "Don't have an account? "
                  : 'Already have an account? '}
                <a
                  href="#"
                  className="font-medium text-blue-600 transition-colors hover:text-blue-700"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLoginMode(!isLoginMode);
                  }}
                >
                  {isLoginMode ? 'Sign up' : 'Sign in'}
                </a>
              </p>
            </motion.div>

            <motion.div
              className="mt-8 text-center text-xs text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              By signing in, you agree to our
              <a href="#" className="mx-1 text-blue-600 hover:text-blue-700">
                Terms of Service
              </a>
              and
              <a href="#" className="mx-1 text-blue-600 hover:text-blue-700">
                Privacy Policy
              </a>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
