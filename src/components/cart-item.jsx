"use client"

import { Link } from "react-router-dom"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/lib/hooks"
import { removeFromCart, updateQuantity } from "@/lib/features/cart/cart-slice"

/**
 * CartItem Props
 * @param {Object} item - Cart item object
 */

export function CartItem({ item }) {
  const dispatch = useAppDispatch()

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
    }
  }

  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
  }

  return (
    <div className="flex gap-4 py-4">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Link to={`/product/${item.id}`}>
          <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-muted">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
          </div>
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0 pr-4">
            <Link to={`/product/${item.id}`}>
              <h3 className="font-medium text-foreground hover:text-accent transition-colors line-clamp-2">
                {item.title}
              </h3>
            </Link>
            <p className="text-lg font-semibold text-foreground mt-1">${item.price.toFixed(2)}</p>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="h-8 w-8 p-0"
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              className="h-8 w-8 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Subtotal: <span className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Updated: feat: Add CartItem component with quantity controls
