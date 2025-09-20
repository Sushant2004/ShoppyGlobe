/**
 * Header Component - ShoppyGlobe E-commerce
 * 
 * This is the main navigation header that appears at the top of every page:
 * - Brand logo and name with link to home page
 * - Global search functionality with real-time filtering
 * - Shopping cart icon with item count badge
 * - Responsive design that adapts to different screen sizes
 * - Sticky positioning for better user experience
 */

"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ShoppingCart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CartSidebar } from "./cart-sidebar"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { setSearchQuery } from "@/lib/features/products/products-slice"

/**
 * Header Component
 * 
 * Main navigation header with search and cart functionality.
 * Handles both real-time search and form submission for better UX.
 * 
 * @returns {JSX.Element} Header component with navigation and search
 */
export function Header() {
  // Redux and navigation hooks
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get cart items and search query from Redux store
  const cartItems = useAppSelector((state) => state.cart.items)
  const searchQuery = useAppSelector((state) => state.products.searchQuery)
  
  // Local search state for controlled input
  const [localSearch, setLocalSearch] = useState(searchQuery)

  // Calculate total items in cart for badge display
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  /**
   * Sync Local Search with Redux State
   * 
   * Ensures local input stays in sync with global search state.
   * Useful when search is cleared from other components.
   */
  useEffect(() => {
    setLocalSearch(searchQuery)
  }, [searchQuery])

  /**
   * Handle Search Form Submission
   * 
   * Triggered when user presses Enter in search input.
   * Dispatches search query and navigates to home page if needed.
   * 
   * @param {Event} e - Form submit event
   */
  const handleSearch = (e) => {
    e.preventDefault()
    const trimmedQuery = localSearch.trim()
    
    // Update global search state
    dispatch(setSearchQuery(trimmedQuery))
    
    // Navigate to home page if not already there and there's a search query
    if (location.pathname !== "/") {
      navigate("/")
    }
  }

  /**
   * Handle Search Input Changes
   * 
   * Provides real-time search as user types.
   * Updates both local state and Redux store immediately.
   * 
   * @param {Event} e - Input change event
   */
  const handleSearchChange = (e) => {
    const value = e.target.value
    setLocalSearch(value)
    
    // Update global search state for real-time filtering
    dispatch(setSearchQuery(value.trim()))
    
    // Navigate to home page if user starts typing and not already there
    if (location.pathname !== "/" && value.trim()) {
      navigate("/")
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* Logo Section - Responsive sizing */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">SG</span>
            </div>
            <span className="text-lg md:text-xl font-bold hidden sm:block">ShoppyGlobe</span>
          </Link>

          {/* Search Form - Improved responsive sizing */}
          <form onSubmit={handleSearch} className="flex-1 max-w-sm md:max-w-md lg:max-w-lg mx-2 md:mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={localSearch}
                onChange={handleSearchChange}
                className="pl-10 bg-background text-foreground text-sm md:text-base"
              />
            </div>
          </form>

          {/* Cart Button - Responsive sizing */}
          <CartSidebar>
            <Button variant="ghost" className="relative flex-shrink-0 p-2 md:p-3">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-5 md:h-5 flex items-center justify-center p-0 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </CartSidebar>
        </div>
      </div>
    </header>
  )
}

// Updated: feat: Add Header component with search and cart functionality
