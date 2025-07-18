// Application-wide constants
export const APP_CONFIG = {
  name: 'Analytics Dashboard',
  description: 'A comprehensive analytics dashboard with role-based access',
  version: '1.0.0',
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    profile: '/api/auth/profile',
  },
  users: '/api/users',
  dashboard: '/api/dashboard',
  projects: '/api/projects',
  subscriptions: '/api/subscriptions',
} as const;

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  user: '/user',
  // Dashboard routes
  dashboardUsers: '/dashboard/users',
  dashboardPlans: '/dashboard/plans',
  dashboardSecurity: '/dashboard/security',
  dashboardSettings: '/dashboard/settings',
  dashboardSubscriptions: '/dashboard/subscriptions',
  dashboardCompanyUsers: '/dashboard/company-users',
  dashboardHelp: '/dashboard/help',
  // User routes
  userProfile: '/user/profile',
  userProjects: '/user/projects',
  userInsights: '/user/insights',
  userOutput: '/user/output',
  userSimulator: '/user/simulator',
  userDesignStudio: '/user/design-studio',
  userChatWithAI: '/user/chat-with-ai',
  // Dashboard2 routes
  dashboard2: '/dashboard2',
  dashboard2Customers: '/dashboard2/customers',
  dashboard2Menu: '/dashboard2/menu',
  dashboard2Orders: '/dashboard2/orders',
} as const;

export const STORAGE_KEYS = {
  user: 'user',
  token: 'token',
  theme: 'theme',
  preferences: 'preferences',
} as const;

export const THEME_OPTIONS = {
  light: 'light',
  dark: 'dark',
  system: 'system',
} as const;

export const PAGINATION_DEFAULTS = {
  page: 1,
  limit: 10,
  maxLimit: 100,
} as const;

// Pastel color palette for project cards
export const PROJECT_COLORS = [
  'bg-gradient-to-br from-rose-100/90 via-pink-50/95 to-rose-100/90',
  'bg-gradient-to-br from-emerald-100/90 via-green-50/95 to-emerald-100/90',
  'bg-gradient-to-br from-blue-100/90 via-sky-50/95 to-blue-100/90',
  'bg-gradient-to-br from-amber-100/90 via-yellow-50/95 to-amber-100/90',
  'bg-gradient-to-br from-violet-100/90 via-purple-50/95 to-violet-100/90',
  'bg-gradient-to-br from-cyan-100/90 via-teal-50/95 to-cyan-100/90',
  'bg-gradient-to-br from-indigo-100/90 via-blue-50/95 to-indigo-100/90',
  'bg-gradient-to-br from-fuchsia-100/90 via-pink-50/95 to-fuchsia-100/90',
  'bg-gradient-to-br from-orange-100/90 via-amber-50/95 to-orange-100/90',
  'bg-gradient-to-br from-slate-100/90 via-gray-50/95 to-slate-100/90',
  'bg-gradient-to-br from-lime-100/90 via-green-50/95 to-lime-100/90',
  'bg-gradient-to-br from-red-100/90 via-rose-50/95 to-red-100/90',
  'bg-gradient-to-br from-teal-100/90 via-cyan-50/95 to-teal-100/90',
  'bg-gradient-to-br from-purple-100/90 via-violet-50/95 to-purple-100/90',
  'bg-gradient-to-br from-sky-100/90 via-blue-50/95 to-sky-100/90',
] as const;

// Function to get a random pastel color
export const getRandomPastelColor = () => {
  return PROJECT_COLORS[Math.floor(Math.random() * PROJECT_COLORS.length)];
};

// Function to get pastel color by index (for consistent coloring)
export const getPastelColorByIndex = (index: number) => {
  return PROJECT_COLORS[index % PROJECT_COLORS.length];
};
