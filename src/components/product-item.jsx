/**
 * ProductItem Component - ShoppyGlobe E-commerce
 * 
 * This component displays a single product card with:
 * - Product image with lazy loading
 * - Product title, rating, and pricing
 * - Discount badge for discounted items
 * - Add to cart functionality
 * - Navigation to product detail page
 * - Hover effects and responsive design
 */

"use client"

import { Link } from "react-router-dom"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/features/cart/cart-slice"
import { LazyImage } from "./lazy-image"
import { useToast } from "@/hooks/use-toast"

/**
 * ProductItem Props
 *
 * @param {Object} product - Product data to display
 */

/**
 * ProductItem Component
 * 
 * Renders a single product card with image, details, and add to cart functionality.
 * 
 * @param props - Component props
 * @param props.product - Product data to display
 * @returns {JSX.Element} Product card component
 */
export function ProductItem({ product }) {
  // Redux dispatch hook for cart actions
  const dispatch = useAppDispatch()
  // Toast hook for user feedback
  const { toast } = useToast()

  /**
   * Handle Add to Cart
   * 
   * Dispatches addToCart action with product details.
   * Shows success toast notification to user.
   * Extracts necessary fields for cart item.
   */
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
      }),
    )
    
    // Show success toast notification
    toast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart.`,
    })
  }

  // Calculate discounted price
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        {/* Product Image Section */}
        <Link to={`/product/${product.id}`}>
          <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-muted">
            {/* Lazy-loaded product image */}
            <LazyImage
              src={product.thumbnail || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            
            {/* Discount Badge */}
            {product.discountPercentage > 0 && (
              <Badge className="absolute top-2 left-2 bg-destructive">
                -{Math.round(product.discountPercentage)}%
              </Badge>
            )}
          </div>
        </Link>

        {/* Product Details Section */}
        <div className="space-y-2">
          {/* Product Title */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-card-foreground line-clamp-2 hover:text-accent transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Product Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">{product.rating}</span>
          </div>

          {/* Product Pricing */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">${discountedPrice.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      {/* Add to Cart Button */}
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" size="sm">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

// Updated: feat: Add ProductItem component with add to cart button
