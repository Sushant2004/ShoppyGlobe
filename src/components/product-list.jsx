/**
 * ProductList Component - ShoppyGlobe E-commerce
 * 
 * This component displays a list of products with:
 * - Product filtering and search functionality
 * - Loading and error states
 * - Responsive grid layout
 * - Empty state handling
 * - Integration with custom hooks for data management
 */

"use client"

import { useProducts } from "@/hooks/use-products"
import { ProductItem } from "./product-item"
import { ProductFilters } from "./product-filters"
import { LoadingSpinner } from "./loading-spinner"

/**
 * ProductList Component
 * 
 * Main component that renders the product list with filters and handles
 * different states (loading, error, empty, success).
 * 
 * @returns {JSX.Element} Product list component with filters and grid layout
 */
export function ProductList() {
  // Get products data and state from custom hook
  const { products, loading, error } = useProducts()

  // Loading State
  if (loading) {
    return <LoadingSpinner />
  }

  // Error State
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-destructive mb-2">Error Loading Products</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  // Main Content
  return (
    <div>
      {/* Product Filters Component */}
      <ProductFilters />

      {/* Products Grid or Empty State */}
      {products.length === 0 ? (
        // Empty State - No products found
        <div className="text-center py-12">
          <div className="bg-muted/50 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        </div>
      ) : (
        // Products Grid - Responsive layout with improved breakpoints
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

// Updated: feat: Add ProductList component with filtering and search
