/**
 * Cart Redux Slice - ShoppyGlobe E-commerce
 * 
 * This slice manages the shopping cart state including:
 * - Cart items with product details and quantities
 * - Total price calculation
 * - Add, remove, update, and clear operations
 * - Immutable state updates using Redux Toolkit
 */

import { createSlice } from "@reduxjs/toolkit"

/**
 * Cart Item Structure
 *
 * Represents a single item in the shopping cart with:
 * - id: Unique product identifier
 * - title: Product name for display
 * - price: Unit price of the product
 * - image: Product image URL for display
 * - quantity: Number of items in cart
 */
/**
 * Cart Item Structure
 *
 * @typedef {Object} CartItem
 * @property {number} id - Unique product identifier
 * @property {string} title - Product name for display
 * @property {number} price - Unit price of the product
 * @property {string} image - Product image URL for display
 * @property {number} quantity - Number of items in cart
 */

/**
 * Cart State Structure
 *
 * Defines the structure of the cart state:
 * - items: Array of cart items
 * - total: Calculated total price of all items
 */
/**
 * Cart State Structure
 *
 * @typedef {Object} CartState
 * @property {CartItem[]} items - Array of cart items
 * @property {number} total - Calculated total price of all items
 */

/**
 * Initial Cart State
 * 
 * Starting state with empty cart and zero total
 */
const initialState = {
  items: [],
  total: 0,
}

/**
 * Cart Redux Slice
 * 
 * Creates a Redux slice for cart management with the following actions:
 * - addToCart: Adds a product to cart or increments quantity
 * - removeFromCart: Removes a product from cart
 * - updateQuantity: Updates the quantity of a cart item
 * - clearCart: Empties the entire cart
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Add to Cart Action
     * 
     * Adds a product to the cart or increments quantity if already present.
     * Automatically recalculates the total price.
     * 
     * @param state - Current cart state
     * @param action - Payload containing product details (without quantity)
     */
    addToCart: (state, action) => {
      // Check if item already exists in cart
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        // Increment quantity if item exists
        existingItem.quantity += 1
      } else {
        // Add new item with quantity 1
        state.items.push({ ...action.payload, quantity: 1 })
      }

      // Recalculate total price
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },

    /**
     * Remove from Cart Action
     * 
     * Removes a product from the cart by ID.
     * Automatically recalculates the total price.
     * 
     * @param state - Current cart state
     * @param action - Payload containing product ID to remove
     */
    removeFromCart: (state, action) => {
      // Filter out the item with matching ID
      state.items = state.items.filter((item) => item.id !== action.payload)
      
      // Recalculate total price
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },

    /**
     * Update Quantity Action
     * 
     * Updates the quantity of a specific cart item.
     * Ensures quantity is at least 1.
     * Automatically recalculates the total price.
     * 
     * @param state - Current cart state
     * @param action - Payload containing product ID and new quantity
     */
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      
      // Only update if item exists and quantity is valid (>= 1)
      if (item && action.payload.quantity >= 1) {
        item.quantity = action.payload.quantity
      }
      
      // Recalculate total price
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },

    /**
     * Clear Cart Action
     * 
     * Removes all items from the cart and resets total to 0.
     * Used after successful checkout.
     * 
     * @param state - Current cart state
     */
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
  },
})

// Export action creators for use in components
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

// Export reducer for store configuration
export default cartSlice.reducer

// Updated: feat: Add cart Redux slice for state management
