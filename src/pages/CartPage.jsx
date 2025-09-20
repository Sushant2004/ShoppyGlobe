/**
 * CartPage Component - ShoppyGlobe E-commerce
 * 
 * This page displays the shopping cart with:
 * - Lazy loaded Cart component for better performance
 * - Header navigation
 * - Full cart management functionality
 * - Responsive layout
 */

import { Suspense, lazy } from "react"
import { Header } from "@/components/header"
import { LoadingSpinner } from "@/components/loading-spinner"

// Lazy load the Cart component for optimal performance
const Cart = lazy(() => import("@/components/cart").then((module) => ({ default: module.Cart })))

/**
 * CartPage Component
 * 
 * Page component for shopping cart management with lazy loading.
 * 
 * @returns {JSX.Element} Cart page with header and lazy-loaded cart component
 */
export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <Cart />
        </Suspense>
      </main>
    </div>
  )
}

// Updated: feat: Add CartPage with full cart management
