/**
 * HomePage Component - ShoppyGlobe E-commerce
 * 
 * This is the main landing page that displays:
 * - Lazy loaded ProductList component for better performance
 * - Welcome message and branding
 * - Header navigation with search functionality
 * - Product grid with filtering and search capabilities
 * - Loading spinner fallback during lazy loading
 */

import { Suspense, lazy } from "react"
import { Header } from "@/components/header"
import { LoadingSpinner } from "@/components/loading-spinner"

// Lazy load the ProductList component for optimal performance
const ProductList = lazy(() => import("@/components/product-list").then((module) => ({ default: module.ProductList })))

/**
 * HomePage Component
 * 
 * Main landing page component with lazy loading for optimal performance.
 * Displays welcome message and product listing.
 * 
 * @returns {JSX.Element} Home page with header and lazy-loaded product list
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Welcome to ShoppyGlobe</h1>
          <p className="text-lg text-muted-foreground text-pretty">Discover amazing products from around the world</p>
        </div>
        
        {/* Lazy Loaded Product List */}
        <Suspense fallback={<LoadingSpinner />}>
          <ProductList />
        </Suspense>
      </main>
    </div>
  )
}

// Updated: feat: Add HomePage with lazy loading
