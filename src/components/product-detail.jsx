"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Star, ShoppingCart, ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { LoadingSpinner } from "./loading-spinner"
import { useAppDispatch } from "@/lib/hooks"
import { addToCart } from "@/lib/features/cart/cart-slice"
import { LazyImage } from "./lazy-image"
import { useToast } from "@/hooks/use-toast"

/**
 * ProductDetail Props
 * @param {number} productId - Product ID to display
 */

export function ProductDetail({ productId }) {
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    // AbortController to handle cleanup and prevent memory leaks
    const abortController = new AbortController()
    
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`, {
          signal: abortController.signal
        })
        if (!response.ok) {
          throw new Error("Product not found")
        }
        const data = await response.json()
        
        // Only update state if component is still mounted
        if (!abortController.signal.aborted) {
          setProduct(data)
        }
      } catch (err) {
        // Only update error state if it's not an abort error and component is still mounted
        if (!abortController.signal.aborted) {
          setError(err instanceof Error ? err.message : "An error occurred")
        }
      } finally {
        // Only update loading state if component is still mounted
        if (!abortController.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchProduct()

    // Cleanup function to abort fetch request when component unmounts or productId changes
    return () => {
      abortController.abort()
    }
  }, [productId])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-destructive mb-2">Product Not Found</h3>
          <p className="text-muted-foreground mb-4">{error || "The product you're looking for doesn't exist."}</p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    )
  }

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

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <div className="max-w-6xl mx-auto">
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
            <LazyImage
              src={product.images[selectedImage] || product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.discountPercentage > 0 && (
              <Badge className="absolute top-4 left-4 bg-destructive">-{Math.round(product.discountPercentage)}%</Badge>
            )}
          </div>

          {/* Image Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-muted"
                  }`}
                >
                  <LazyImage
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{product.title}</h1>
            <p className="text-muted-foreground">{product.brand}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{product.stock} in stock</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-foreground">${discountedPrice.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleAddToCart} className="flex-1" size="lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="w-5 h-5" />
            </Button>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <p className="font-medium capitalize">{product.category}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Brand:</span>
                  <p className="font-medium">{product.brand}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Updated: feat: Add ProductDetail component with image gallery
