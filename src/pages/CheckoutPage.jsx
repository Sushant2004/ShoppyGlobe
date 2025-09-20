/**
 * CheckoutPage Component - ShoppyGlobe E-commerce
 * 
 * This page handles the checkout process with:
 * - Lazy loaded Checkout component for better performance
 * - Header navigation
 * - Complete order processing functionality
 * - Payment method selection
 * - Form validation and submission
 */

import { Suspense, lazy } from "react"
import { Header } from "@/components/header"
import { LoadingSpinner } from "@/components/loading-spinner"

// Lazy load the Checkout component for optimal performance
const Checkout = lazy(() => import("@/components/checkout").then((module) => ({ default: module.Checkout })))

/**
 * CheckoutPage Component
 * 
 * Page component for order checkout process with lazy loading.
 * 
 * @returns {JSX.Element} Checkout page with header and lazy-loaded checkout component
 */
export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <Checkout />
        </Suspense>
      </main>
    </div>
  )
}

// Updated: feat: Add CheckoutPage with order processing
