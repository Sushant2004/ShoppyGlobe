/**
 * ProductSkeleton Component - ShoppyGlobe E-commerce
 * 
 * Skeleton loading component that mimics the structure of ProductItem
 * to provide a better loading experience while products are being fetched.
 */

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * ProductSkeleton Component
 * 
 * Displays skeleton placeholders for product items during loading.
 * 
 * @param {number} [count=8] - Number of skeleton items to display
 * @returns {JSX.Element} Skeleton loading component
 */
export function ProductSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="aspect-square relative">
            <Skeleton className="w-full h-full" />
          </div>
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-9 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Updated: feat: Add product skeleton loading component
