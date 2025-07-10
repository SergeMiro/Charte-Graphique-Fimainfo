# FIMA1NFO Design System Demo

## Overview

This is a Next.js web application built with React and TypeScript. The application serves as a design system demo for FIMA1NFO, showcasing UI components and theming capabilities. It features a modern tech stack with Next.js App Router, shadcn/ui components, and comprehensive theme management system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with App Router and React 18
- **Language**: TypeScript with ES modules
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Next.js App Router with file-based routing
- **State Management**: Client-side state with React hooks
- **Build Tool**: Next.js with built-in optimization
- **Component System**: Comprehensive UI library based on Radix UI primitives
- **Image Optimization**: Next.js Image component for optimized assets

### Database Architecture
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Environment-based database URL configuration

## Key Components

### UI Component Library
The application uses a comprehensive set of pre-built components from shadcn/ui including:
- Form components (Button, Input, Checkbox, etc.)
- Layout components (Card, Dialog, Sheet, etc.)
- Navigation components (Menubar, Breadcrumb, etc.)
- Data display components (Table, Badge, Progress, etc.)
- Feedback components (Toast, Alert, etc.)

### Theme System
- **Multi-theme Support**: Three predefined themes (SAM Light, Business Dark, Accent Light)
- **CSS Variables**: Dynamic theming through CSS custom properties
- **Dark Mode**: Built-in dark mode support with class-based switching
- **Color System**: Comprehensive color palette with semantic naming

### Database Schema
- **User Management**: Basic user schema with username/password authentication
- **Type Safety**: Drizzle-zod integration for runtime type validation
- **Schema Location**: Centralized in `shared/schema.ts` for frontend/backend sharing

## Data Flow

### Client-Server Communication
1. **API Requests**: Frontend uses fetch-based API client with credential support
2. **Error Handling**: Centralized error handling with HTTP status code interpretation
3. **Query Management**: TanStack Query for caching, synchronization, and background updates
4. **Type Sharing**: Shared TypeScript types between frontend and backend

### Development Workflow
1. **Hot Reload**: Development server with automatic restart on file changes
2. **Build Process**: Vite for frontend bundling, esbuild for backend compilation
3. **Type Checking**: Incremental TypeScript compilation with strict mode
4. **Database Updates**: Push-based schema updates to development database

## External Dependencies

### Core Libraries
- **UI Framework**: React with TypeScript
- **Component Library**: Radix UI primitives with shadcn/ui styling
- **Database**: Neon PostgreSQL serverless with Drizzle ORM
- **Icons**: Heroicons and Lucide React for iconography
- **Utilities**: date-fns for date manipulation, clsx for conditional styling

### Development Tools
- **Build Tools**: Vite for frontend, esbuild for backend
- **Type System**: TypeScript with strict configuration
- **Styling**: Tailwind CSS with PostCSS processing
- **Code Quality**: ESLint-compatible setup with TypeScript integration

### Replit Integration
- **Development Environment**: Replit-specific plugins for development experience
- **Error Overlay**: Runtime error modal for better debugging
- **Asset Management**: Configured asset paths for Replit environment

## Deployment Strategy

### Production Build
- **Frontend**: Static assets compiled to `dist/public` directory
- **Backend**: Node.js bundle compiled to `dist/index.js`
- **Environment**: Production mode with NODE_ENV configuration
- **Database**: Environment variable-based database connection

### Development Environment
- **Live Reload**: Automatic server restart and frontend hot reload
- **Database Setup**: Drizzle migrations with development database
- **Asset Serving**: Static file serving through Express middleware
- **Error Handling**: Development-friendly error reporting and debugging

### Configuration Management
- **Environment Variables**: Database URL and environment-specific settings
- **Path Aliases**: TypeScript path mapping for clean imports
- **Build Optimization**: Tree shaking and code splitting for production builds