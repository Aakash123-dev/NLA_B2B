# Gazelle NextJS Phase 5

A modern, full-stack analytics platform built with Next.js 15.4.1, TypeScript, and Tailwind CSS. This project is a complete migration and upgrade from the previous React + Node.js backend to a unified Next.js application with API routes.

## 🚀 Features

- **Dashboard & Analytics**: Comprehensive dashboard with real-time analytics
- **Design Studio**: Visual workflow designer with drag-and-drop interface
- **Insights Management**: Advanced data insights and reporting
- **Chat Interface**: Real-time chat functionality
- **Simulation Tools**: Price and margin simulation capabilities
- **Calendar & Events**: Event management and scheduling
- **Admin Panel**: Complete admin interface for user and project management
- **Authentication**: Secure JWT-based authentication system
- **File Upload**: Robust file upload and management system
- **Email Integration**: Automated email notifications and reporting

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.4.1** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management with Redux Persist
- **React Hook Form** - Forms with validation
- **Zod** - Schema validation
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend (API Routes)
- **Next.js API Routes** - Serverless API endpoints
- **PostgreSQL** - Primary database
- **Drizzle ORM** - Type-safe database ORM
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **Nodemailer** - Email functionality
- **Winston** - Logging

### Charts & Visualization
- **Recharts** - React charting library
- **ApexCharts** - Advanced charting
- **React Flow** - Node-based UI for Design Studio

### UI Components
- **Headless UI** - Unstyled UI components
- **React Beautiful DnD** - Drag and drop
- **React Big Calendar** - Calendar component
- **React Select** - Select components

## 📁 Project Structure

```
Gazelle_NextJS_Phase5/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication pages
│   │   ├── dashboard/      # Dashboard pages
│   │   ├── admin/          # Admin pages
│   │   ├── design-studio/  # Design studio pages
│   │   ├── insights/       # Insights pages
│   │   ├── chat/           # Chat pages
│   │   ├── simulation/     # Simulation pages
│   │   ├── calendar/       # Calendar pages
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable components
│   │   ├── ui/            # Base UI components
│   │   ├── forms/         # Form components
│   │   ├── charts/        # Chart components
│   │   ├── layout/        # Layout components
│   │   └── navigation/    # Navigation components
│   ├── lib/               # Utility libraries
│   │   ├── auth/          # Authentication utilities
│   │   ├── db/            # Database utilities
│   │   ├── api/           # API utilities
│   │   └── validations/   # Zod schemas
│   ├── hooks/             # Custom React hooks
│   ├── store/             # Redux store
│   │   ├── slices/        # Redux slices
│   │   └── middleware/    # Redux middleware
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions
│   ├── styles/            # Global styles
│   └── config/            # Configuration files
├── public/                # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .cursorrules           # Cursor IDE rules
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Gazelle_NextJS_Phase5
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Copy the environment variables template:
   ```bash
   cp .env.example .env.local
   ```

   Update the environment variables in `.env.local`:
   ```env
   # Database Configuration
   DATABASE_URL="postgresql://postgres:password@localhost:5432/gazelle_db"
   DB_HOST="localhost"
   DB_USER="postgres"
   DB_PASS="password"
   DB_NAME="gazelle_db"
   
   # JWT Configuration
   JWT_SECRET="your-super-secret-jwt-key"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Email Configuration
   SMTP_EMAIL="your-email@gmail.com"
   SMTP_PASSWORD="your-email-password"
   
   # Application Configuration
   COMPANY_NAME="Northlight Analytics"
   SUPPORT_EMAIL="support@northlightanalytics.com"
   FRONTEND_URL="http://localhost:3000"
   
   NODE_ENV="development"
   PORT=3000
   ```

4. **Database Setup**
   ```bash
   # Generate database schema
   npm run db:generate
   
   # Run migrations
   npm run db:migrate
   
   # (Optional) Open database studio
   npm run db:studio
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check
- `npm run db:generate` - Generate database schema
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open database studio

## 🔐 Authentication

The application uses JWT-based authentication with the following endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/register` - User registration
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Users** - User authentication and profile information
- **Projects** - Project management
- **Models** - Design studio models and workflows
- **Insights** - Analytics and insights data
- **Charts** - Data visualization configurations
- **Categories & Products** - Product management
- **Events** - Calendar and scheduling events
- **Admin Questions** - Admin functionality

## 🎨 UI Components

The application includes a comprehensive set of reusable UI components:

- **Forms** - Input fields, selects, checkboxes, radio buttons
- **Navigation** - Sidebar, header, breadcrumbs
- **Data Display** - Tables, cards, badges, tooltips
- **Feedback** - Alerts, notifications, loading states
- **Overlays** - Modals, dropdowns, popovers
- **Charts** - Various chart types for data visualization

## 📊 State Management

The application uses Redux Toolkit for state management with the following slices:

- **auth** - Authentication state
- **user** - User profile and preferences
- **project** - Project data and management
- **model** - Design studio models
- **insights** - Analytics and insights
- **chart** - Chart configurations
- **ui** - UI state (theme, sidebar, etc.)
- **admin** - Admin functionality

## 🔧 Configuration

### Next.js Configuration

Key configurations in `next.config.js`:
- Image optimization
- Security headers
- API rewrites
- Performance optimizations

### Tailwind CSS

Custom theme configuration includes:
- Color palette
- Typography
- Spacing
- Animations
- Component utilities

### ESLint & Prettier

Code quality configurations:
- TypeScript rules
- React best practices
- Import organization
- Consistent formatting

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables

Ensure all production environment variables are set:
- Database connection strings
- JWT secrets
- Email configuration
- API keys
- Domain URLs

### Recommended Hosting

- **Vercel** - Optimal for Next.js applications
- **Netlify** - Alternative hosting platform
- **AWS/Google Cloud** - For custom deployment needs

## 📈 Performance Optimization

- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic route-based splitting
- **Caching** - Redis for session and API caching
- **Database Indexing** - Optimized database queries
- **Bundle Analysis** - Regular bundle size monitoring

## 🧪 Testing

Testing setup includes:
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Cypress** - End-to-end testing
- **MSW** - API mocking

## 📚 Documentation

- **API Documentation** - Swagger/OpenAPI specification
- **Component Documentation** - Storybook integration
- **Code Comments** - Inline documentation
- **Migration Guide** - From previous React version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- **Production**: https://northlightanalytics.com
- **Staging**: https://staging.northlightanalytics.com
- **Documentation**: https://docs.northlightanalytics.com

## 🆘 Support

For support and questions:
- **Email**: support@northlightanalytics.com
- **Documentation**: Check the `/docs` directory
- **Issues**: GitHub Issues for bug reports and feature requests

## 📋 Migration Notes

This project is migrated from the previous React + Node.js setup:

### Key Changes
- Unified Next.js application with API routes
- Modern TypeScript setup
- Tailwind CSS for styling
- Redux Toolkit for state management
- Improved developer experience

### Migration Steps
1. API routes converted from Express to Next.js API routes
2. React components updated to Next.js conventions
3. State management migrated to Redux Toolkit
4. Styling converted to Tailwind CSS
5. Authentication system updated for Next.js
6. Database queries optimized with Drizzle ORM

### Breaking Changes
- API endpoint structure updated
- Authentication flow modified
- Component prop interfaces updated
- State management patterns changed

For detailed migration information, see the migration guide in the `/docs` directory.

---

**Built with ❤️ by the Northlight Analytics team** 