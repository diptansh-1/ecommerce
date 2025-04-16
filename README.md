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

## API Integration

The application uses the following public API endpoints from FakeStoreAPI:

- Products: https://fakestoreapi.com/products
- Carts: https://fakestoreapi.com/carts
- Users: https://fakestoreapi.com/users

## License

This project is licensed under the MIT License.
