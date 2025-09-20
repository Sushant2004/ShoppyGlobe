// Redux store setup with cart and products slices

import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./features/cart/cart-slice"
import productsReducer from "./features/products/products-slice"

// Configure the Redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

// Store structure reference for development
// RootState: ReturnType<typeof store.getState>
// AppDispatch: typeof store.dispatch

// Updated: feat: Add Redux store configuration
