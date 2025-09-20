/**
 * Main App Component - ShoppyGlobe E-commerce
 * 
 * This is the root component that sets up the entire application:
 * - Configures React Router for client-side navigation
 * - Provides theme context for light/dark mode support
 * - Sets up global toast notification system
 * - Defines all application routes and their corresponding components
 * - Handles 404 errors with a custom NotFound page
 */

import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { LoadingSpinner } from "./components/loading-spinner"

// Lazy load all page components for optimal performance
const HomePage = lazy(() => import("./pages/HomePage"))
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"))
const CartPage = lazy(() => import("./pages/CartPage"))
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))

/**
 * App Component
 * 
 * The main application component that wraps all pages with necessary providers
 * and sets up the routing structure for the entire e-commerce application.
 * 
 * Features:
 * - React.lazy + Suspense for all page components (code splitting)
 * - Loading spinner fallback during lazy loading
 * - Theme provider for light/dark mode support
 * - Global toast notification system
 * - Comprehensive routing with 404 handling
 * 
 * Routes:
 * - / : Home page with product list and search
 * - /product/:id : Individual product detail page
 * - /cart : Shopping cart page
 * - /checkout : Checkout and payment page
 * - * : 404 Not Found page for invalid routes
 * 
 * @returns {JSX.Element} Complete application with routing and providers
 */
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="shoppyglobe-theme">
      <div className="min-h-screen bg-background">
        {/* Application Routes with Lazy Loading */}
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Home Page - Product listing and search */}
            <Route path="/" element={<HomePage />} />
            
            {/* Product Detail Page - Individual product view */}
            <Route path="/product/:id" element={<ProductDetailPage />} />
            
            {/* Cart Page - Shopping cart management */}
            <Route path="/cart" element={<CartPage />} />
            
            {/* Checkout Page - Order completion */}
            <Route path="/checkout" element={<CheckoutPage />} />
            
            {/* 404 Page - Handles all unmatched routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        
        {/* Global Toast Notification System */}
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App
