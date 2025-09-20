// Hook for managing products - fetching, filtering, and search

"use client"

import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { setLoading, setProducts, setError } from "@/lib/features/products/products-slice"
import { selectFilteredProducts } from "@/lib/features/products/products-slice"
import { useDebounce } from "./use-debounce"

// Manages product data fetching and filtering
export const useProducts = () => {
  const dispatch = useAppDispatch()
  const { products, searchQuery, selectedCategory, sortBy, loading, error, categories } = useAppSelector(
    (state) => state.products,
  )

  const filteredProducts = useAppSelector(selectFilteredProducts)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  useEffect(() => {
    // AbortController to handle cleanup and prevent memory leaks
    const abortController = new AbortController()
    
    const fetchProducts = async () => {
      dispatch(setLoading(true))
      
      try {
        const response = await fetch("https://dummyjson.com/products?limit=100", {
          signal: abortController.signal
        })
        
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        
        const data = await response.json()
        
        // Only dispatch if component is still mounted
        if (!abortController.signal.aborted) {
          dispatch(setProducts(data.products))
        }
      } catch (err) {
        // Only dispatch error if it's not an abort error and component is still mounted
        if (!abortController.signal.aborted) {
          dispatch(setError(err instanceof Error ? err.message : "An error occurred"))
        }
      }
    }

    if (products.length === 0) {
      fetchProducts()
    }

    // Cleanup function to abort fetch request when component unmounts
    return () => {
      abortController.abort()
    }
  }, [dispatch, products.length])

  return useMemo(
    () => ({
      products: filteredProducts,
      allProducts: products,
      searchQuery: debouncedSearchQuery,
      selectedCategory,
      sortBy,
      loading,
      error,
      categories,
    }),
    [filteredProducts, products, debouncedSearchQuery, selectedCategory, sortBy, loading, error, categories],
  )
}

// Updated: feat: Add useProducts custom hook for data fetching
