# KGPath Education Platform

## Overview

KGPath is an AI-focused education platform offering comprehensive courses in AI Digital Marketing, AI Full Stack Development, and AI Data Analytics. The application is built as a modern, responsive web platform designed to showcase courses, facilitate student inquiries, and support placement services with a 95% placement rate goal.

The platform emphasizes trust-building through professional design, clear course presentation, and conversion optimization, drawing inspiration from established platforms like Coursera, Udacity, and edX while maintaining its own identity as a premium AI education provider.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing instead of React Router

**UI Component System**
- Shadcn UI component library (New York style variant) with Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Component aliases configured for clean imports (@/components, @/lib, @/hooks, @/ui)

**Design System**
- Custom color system using HSL values with CSS variables for theming
- Typography: Inter (UI/body), Space Grotesk (headings), JetBrains Mono (code)
- Consistent spacing scale using Tailwind units (4, 6, 8, 12, 16, 20, 24)
- Responsive grid system for course cards, features, testimonials, and stats
- Custom elevation system with hover and active states

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- React Hook Form with Zod for form state and validation
- Local component state with React hooks for UI interactions

**Key Pages**
- Home: Hero, stats, course highlights, features, testimonials, partners
- About: Mission, team, values, achievements
- Courses: Filterable course catalog with level and category filters
- Course Detail: Individual course information with curriculum, instructor, FAQs
- Placement: Success stats, placement process, company partnerships
- Contact: Form submission for inquiries with course selection

### Backend Architecture

**Server Framework**
- Express.js running on Node.js with TypeScript
- ESM (ES Modules) configuration throughout the codebase
- Custom middleware for request logging and JSON response capture

**API Design**
- RESTful endpoints under /api prefix
- POST /api/contact - Contact inquiry submission
- POST /api/newsletter - Newsletter subscription
- Request validation using Zod schemas from shared directory

**Data Storage Strategy**
- In-memory storage implementation (MemStorage class) for development
- IStorage interface abstraction for future database migration
- Drizzle ORM configured for PostgreSQL (ready for production database)
- Schema defined with Drizzle for contact_inquiries and newsletter_subscriptions tables

**Development vs Production**
- Development: Vite middleware integration for HMR
- Production: Static file serving from dist/public
- Environment-based configuration via NODE_ENV

### Database Schema

**Planned PostgreSQL Tables** (via Drizzle ORM)

**contact_inquiries**
- id: UUID primary key (auto-generated)
- name: Text (required)
- email: Text (required)
- phone: Text (required)
- course_interest: Text (required)
- message: Text (required)
- created_at: Timestamp with default now()

**newsletter_subscriptions**
- id: UUID primary key (auto-generated)
- email: Text (required, unique)
- created_at: Timestamp with default now()

**Validation**
- Zod schemas enforce minimum lengths and format validation
- Email validation for proper email format
- Phone minimum 10 digits
- Message minimum 10 characters

### External Dependencies

**UI Libraries**
- @radix-ui/* - Accessible component primitives (dialogs, dropdowns, accordions, etc.)
- class-variance-authority - Component variant management
- tailwindcss - Utility-first CSS framework
- embla-carousel-react - Carousel/slider functionality

**Form & Validation**
- react-hook-form - Form state management
- @hookform/resolvers - Form validation integration
- zod - Runtime type validation and schema definition
- drizzle-zod - Drizzle to Zod schema conversion

**Data Fetching**
- @tanstack/react-query - Server state management and caching

**Database & ORM**
- drizzle-orm - TypeScript ORM for SQL databases
- drizzle-kit - Database migration tooling
- @neondatabase/serverless - Serverless PostgreSQL driver for Neon

**Development Tools**
- tsx - TypeScript execution for development server
- esbuild - Fast JavaScript bundler for production builds
- @vitejs/plugin-react - React support for Vite
- @replit/vite-plugin-* - Replit-specific development enhancements

**Utilities**
- date-fns - Date manipulation and formatting
- clsx & tailwind-merge - Conditional className management
- cmdk - Command menu component
- lucide-react - Icon library
- nanoid - Unique ID generation

**Session Management**
- connect-pg-simple - PostgreSQL session store (configured for future use)