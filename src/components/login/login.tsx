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
  Eye,
  EyeOff,
} from 'lucide-react';

import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '../features';
import { toast } from 'react-hot-toast';

// Demo users for testing
const DEMO_USERS = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin', name: 'Admin User' },
  { email: 'manager@example.com', password: 'manager123', role: 'manager', name: 'Manager User' },
  { email: 'user@example.com', password: 'user123', role: 'user', name: 'Regular User' },
  { email: 'audit@example.com', password: 'audit123', role: 'audit', name: 'Audit User' },
];

export default function LoginPage() {
  const { login, error, isLoading, clearError, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Ensure page is fully loaded before rendering content
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  // Clear form errors when switching modes
  useEffect(() => {
    setFormErrors({});
    clearError();
  }, [isLoginMode, clearError]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!isLoginMode && !name.trim()) {
      errors.name = 'Full name is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setFormErrors({});

    if (!validateForm()) {
      return;
    }

    try {
      if (isLoginMode) {
        await login(email, password, rememberMe);
        toast.success('Login successful!');
      } else {
        // For sign up mode, we'd typically call a register function
        // For now we'll just log in with the provided credentials
        await login(email, password, rememberMe);
        toast.success('Account created and logged in successfully!');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const handleDemoLogin = async (demoUser: typeof DEMO_USERS[0]) => {
    setEmail(demoUser.email);
    setPassword(demoUser.password);
    setRememberMe(true);
    
    try {
      await login(demoUser.email, demoUser.password, true);
      toast.success(`Logged in as ${demoUser.name}`);
    } catch (error) {
      toast.error('Demo login failed');
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast(`${provider} login coming soon!`);
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
    <div className="relative flex min-h-screen">
      {/* Left side - Background image */}
      <div className="hidden lg:block lg:w-[80%] relative">
        <Image
          src="/background.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/40"></div>
        
        {/* Content overlay on left side */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center text-white">
            <motion.div
              className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={50}
                height={50}
                className="object-contain"
                onError={() => {
                  console.log('Logo failed to load');
                }}
              />
            </motion.div>
            <motion.h2
              className="mb-4 text-4xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Welcome to Northlight Analytics
            </motion.h2>
            <motion.p
              className="text-xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Advanced analytics platform for retail and consumer goods
            </motion.p>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white">
        {/* Login card container with animation */}
        <motion.div
          className="w-full max-w-md p-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Header with logo for mobile */}
          <div className="mb-8 text-center lg:hidden">
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

          {/* Desktop header */}
          <div className="mb-8 text-center hidden lg:block">
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
                    className={`border-slate-200 py-6 pl-10 transition-all focus:border-blue-500 focus:ring-blue-500 ${
                      formErrors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                </div>
                {formErrors.name && (
                  <p className="text-xs text-red-600">{formErrors.name}</p>
                )}
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
                  className={`border-slate-200 py-6 pl-10 transition-all focus:border-blue-500 focus:ring-blue-500 ${
                    formErrors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                />
              </div>
              {formErrors.email && (
                <p className="text-xs text-red-600">{formErrors.email}</p>
              )}
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
                    href="/auth/forgot-password"
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
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`border-slate-200 py-6 pl-10 pr-10 transition-all focus:border-blue-500 focus:ring-blue-500 ${
                    formErrors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-xs text-red-600">{formErrors.password}</p>
              )}
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
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
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
          </form>
        </motion.div>
      </div>
    </div>
  );
}
