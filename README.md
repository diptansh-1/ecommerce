# Shop E-Commerce Application

## Overview

Shop is a sophisticated e-commerce web application built with Next.js, offering a premium shopping experience for users. The application features a visually stunning interface, advanced state management, data persistence, and a seamless checkout process.

## Features

### User Experience & Interface
- Visually stunning and intuitive shopping interface
- Smooth transitions and animations between screens
- Responsive layout that works across different device sizes
- Dark/light mode toggle with animated transitions
- Server-side rendering for improved performance

### Product Browsing & Discovery
- Advanced filtering and sorting options with animated transitions
- Engaging product detail view with image galleries
- "Quick Look" feature with gesture controls
- Skeleton loading states for improved perceived performance

### Shopping Cart & Checkout
- Drag-and-drop interface for adding items to cart
- Interactive cart summary with quantity adjustments
- Persistent cart that survives logout and login
- Multi-step checkout process with form validation
- Order confirmation with visual feedback

### User Accounts
- User profiles with order history visualization
- Secure authentication with Clerk
- Wishlist feature with persistent storage

### State Management & Data Persistence
- Efficient state management with Zustand
- Persistent shopping cart that survives browser refresh
- Offline mode with data synchronization
- Optimistic UI updates for a responsive feel

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: Clerk
- **Database**: MongoDB with Mongoose
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form with Zod validation
- **API Integration**: Axios, FakeStoreAPI

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- MongoDB database
- Clerk account for authentication

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# MongoDB
MONGODB_URI=your_mongodb_uri
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/shop.git
cd shop

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Quick Deployment

This project is configured for easy deployment without strict type checking or linting:

1. Update the environment variables in `.env.production` with your actual values
2. Run the deployment command:

```bash
npm run deploy
```

#### Deploying to Vercel

For the easiest deployment experience:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set your environment variables in the Vercel dashboard
4. Deploy!

## Project Structure

```
/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── (auth)/           # Authentication routes
│   ├── (shop)/           # Main shop routes
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── ui/               # UI components
│   ├── layout/           # Layout components
│   ├── product/          # Product components
│   └── cart/             # Cart components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── store/                # Zustand stores
├── models/               # MongoDB models
└── types/                # TypeScript type definitions
```

## Technical Decisions and Architecture

### Frontend Architecture
- **Next.js 15**: Utilizing the latest Next.js features including App Router for improved routing and server components
- **TypeScript**: Type-safe code to reduce bugs and improve developer experience
- **Tailwind CSS v4**: Utility-first CSS framework for rapid UI development with the latest features
- **Component Structure**: Modular component architecture for reusability and maintainability

### State Management
- **Zustand**: Chosen for its simplicity and performance compared to Redux or Context API for global state
- **React Context**: Used specifically for theme management with next-themes
- **Local Storage**: Implemented for persistent cart and user preferences across sessions

### Authentication
- **Clerk**: Selected for its modern authentication features, ease of integration, and security benefits
- **Custom Middleware**: Implemented to protect routes and API endpoints while maintaining flexibility

### Data Fetching Strategy
- **Server Components**: Leveraging Next.js server components for data fetching to reduce client-side JavaScript
- **API Routes**: Custom API routes for server-side operations and data manipulation
- **MongoDB**: NoSQL database chosen for flexibility in schema design and scalability

### Performance Considerations
- **Image Optimization**: Using Next.js Image component for automatic image optimization
- **Code Splitting**: Automatic code splitting for faster page loads and better user experience
- **Incremental Static Regeneration**: Implemented for product pages to balance fresh content and performance

## API Integration

The application uses the following public API endpoints from FakeStoreAPI:

- Products: https://fakestoreapi.com/products
- Carts: https://fakestoreapi.com/carts
- Users: https://fakestoreapi.com/users

## Challenges Faced and Solutions

### Challenge 1: Authentication Integration
**Problem**: Integrating Clerk authentication with Next.js 15 and ensuring it works with API routes.

**Solution**: Used the correct import paths (`@clerk/nextjs/server` instead of `@clerk/nextjs`) and implemented proper middleware configuration to handle authentication across the application.

### Challenge 2: Dark/Light Mode Implementation
**Problem**: The dark/light mode toggle wasn't working correctly due to conflicts between CSS variables and the next-themes library.

**Solution**: Refactored the CSS variables to use class-based theming instead of media queries, and updated the theme provider configuration to use the 'class' attribute for theme switching.

### Challenge 3: Order Management
**Problem**: Creating and displaying orders was challenging due to authentication issues with the API routes.

**Solution**: Implemented a fallback mechanism using localStorage to store orders when the database connection fails, ensuring users can still see their order history even if there are backend issues.

### Challenge 4: Dependency Conflicts
**Problem**: Deployment to Vercel faced peer dependency conflicts between React 19 and packages requiring React 18.

**Solution**: Implemented multiple strategies to bypass these conflicts:
- Added an `.npmrc` file with legacy-peer-deps=true
- Updated package.json with resolutions for React
- Modified vercel.json to use the --legacy-peer-deps flag during installation

### Challenge 5: Responsive Design
**Problem**: Creating a consistent user experience across different device sizes.

**Solution**: Used Tailwind CSS's responsive utilities and implemented custom breakpoints where needed. Created device-specific layouts for certain components like the product filters.

## License

This project is licensed under the MIT License.
