/**
 * ProductFilters Component - ShoppyGlobe E-commerce
 * 
 * This component provides filtering and sorting functionality for the product list:
 * - Category filtering to show products from specific categories
 * - Sorting options (by name, price, rating)
 * - Mobile-responsive design with collapsible filters
 * - Clear filters functionality to reset all selections
 * - Note: Search functionality is handled by the header component
 */

"use client"

import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setSelectedCategory, setSortBy } from "@/lib/features/products/products-slice"
import { useState } from "react"

/**
 * ProductFilters Component
 * 
 * Renders filter and sort controls for the product list.
 * Integrates with Redux store to manage filter state.
 * 
 * @returns {JSX.Element} Filter controls component
 */
export function ProductFilters() {
  // Redux hooks for state management
  const dispatch = useAppDispatch()
  const { selectedCategory, sortBy, categories } = useAppSelector((state) => state.products)
  
  // Local state for mobile filter visibility
  const [showFilters, setShowFilters] = useState(false)

  /**
   * Handle Clear All Filters
   * 
   * Resets category and sort filters to their default values.
   * Search is handled separately in the header component.
   */
  const handleClearFilters = () => {
    dispatch(setSelectedCategory("all")) // Reset to show all categories
    dispatch(setSortBy("name")) // Reset to sort by name
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          <div className={`flex flex-col sm:flex-row gap-4 lg:flex ${showFilters ? "block" : "hidden lg:flex"} w-full`}>
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={(value) => dispatch(setSelectedCategory(value))}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem> {/* Updated value to "all" */}
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort By */}
              <Select value={sortBy} onValueChange={(value) => dispatch(setSortBy(value))}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button variant="outline" onClick={handleClearFilters}>
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Updated: feat: Add ProductFilters component for search and sorting
