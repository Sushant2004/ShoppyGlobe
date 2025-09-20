/**
 * ProductDetailPage Component - ShoppyGlobe E-commerce
 * 
 * This page displays individual product details with:
 * - Lazy loaded ProductDetail component for better performance
 * - Dynamic routing with product ID parameter
 * - Header navigation
 * - Complete product information display
 * - Add to cart functionality
 */

"use client"

import { Suspense, lazy } from "react"
import { useParams } from "react-router-dom"
import { Header } from "@/components/header"
import { LoadingSpinner } from "@/components/loading-spinner"

// Lazy load the ProductDetail component for optimal performance
const ProductDetail = lazy(() => import("@/components/product-detail").then((module) => ({ default: module.ProductDetail })))

/**
 * ProductDetailPage Component
 * 
 * Page component for individual product display with lazy loading.
 * Extracts product ID from URL parameters.
 * 
 * @returns {JSX.Element} Product detail page with header and lazy-loaded product component
 */
export default function ProductDetailPage() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <ProductDetail productId={Number(id)} />
        </Suspense>
      </main>
    </div>
  )
}

// Updated: feat: Add ProductDetailPage with dynamic routing
