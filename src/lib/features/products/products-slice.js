/**
 * Products Redux Slice - ShoppyGlobe E-commerce
 * 
 * This slice manages product data and filtering functionality including:
 * - Product data fetching and storage
 * - Search functionality across title, description, category, and brand
 * - Category filtering
 * - Sorting by price, rating, and name
 * - Loading and error states
 * - Memoized selectors for performance
 */

import { createSlice } from "@reduxjs/toolkit"
import { createSelector } from "reselect"

/**
 * Product Structure
 *
 * Represents a single product with all its details:
 * - id: Unique product identifier
 * - title: Product name
 * - description: Product description
 * - price: Product price
 * - discountPercentage: Discount percentage
 * - rating: Product rating (1-5)
 * - stock: Available stock quantity
 * - brand: Product brand
 * - category: Product category
 * - thumbnail: Main product image URL
 * - images: Array of product image URLs
 */
/**
 * Product Structure
 *
 * @typedef {Object} Product
 * @property {number} id - Unique product identifier
 * @property {string} title - Product name
 * @property {string} description - Product description
 * @property {number} price - Product price
 * @property {number} discountPercentage - Discount percentage
 * @property {number} rating - Product rating (1-5)
 * @property {number} stock - Available stock quantity
 * @property {string} brand - Product brand
 * @property {string} category - Product category
 * @property {string} thumbnail - Main product image URL
 * @property {string[]} images - Array of product image URLs
 */

/**
 * Products State Structure
 *
 * Defines the structure of the products state:
 * - products: Original product data from API
 * - filteredProducts: Products after applying filters and search
 * - searchQuery: Current search term
 * - selectedCategory: Currently selected category filter
 * - sortBy: Current sorting method
 * - loading: Loading state for API calls
 * - error: Error message if API call fails
 * - categories: Available product categories
 */
/**
 * Products State Structure
 *
 * @typedef {Object} ProductsState
 * @property {Product[]} products - Original product data from API
 * @property {Product[]} filteredProducts - Products after applying filters and search
 * @property {string} searchQuery - Current search term
 * @property {string} selectedCategory - Currently selected category filter
 * @property {string} sortBy - Current sorting method ("price-asc" | "price-desc" | "rating" | "name")
 * @property {boolean} loading - Loading state for API calls
 * @property {string|null} error - Error message if API call fails
 * @property {string[]} categories - Available product categories
 */

/**
 * Initial Products State
 * 
 * Starting state with empty products and default filter values
 */
const initialState = {
  products: [],
  filteredProducts: [],
  searchQuery: "",
  selectedCategory: "",
  sortBy: "name",
  loading: false,
  error: null,
  categories: [],
}

/**
 * Products Redux Slice
 * 
 * Creates a Redux slice for product management with the following actions:
 * - setLoading: Controls loading state
 * - setProducts: Sets product data and extracts categories
 * - setError: Sets error state
 * - setSearchQuery: Updates search term and applies filters
 * - setSelectedCategory: Updates category filter and applies filters
 * - setSortBy: Updates sort method and applies filters
 * - applyFilters: Applies search, category, and sort filters
 */
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    /**
     * Set Loading State Action
     * 
     * Controls the loading state during API calls.
     * 
     * @param state - Current products state
     * @param action - Payload containing boolean loading state
     */
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    /**
     * Set Products Action
     * 
     * Sets the product data from API and extracts unique categories.
     * Automatically applies current filters to the new data.
     * 
     * @param state - Current products state
     * @param action - Payload containing array of products
     */
    setProducts: (state, action) => {
      state.products = action.payload
      
      // Extract unique categories from products
      state.categories = [...new Set(action.payload.map((product) => product.category))]
      
      // Reset loading and error states
      state.loading = false
      state.error = null
      
      // Apply current filters to new data
      productsSlice.caseReducers.applyFilters(state)
    },

    /**
     * Set Error Action
     * 
     * Sets error state when API calls fail.
     * 
     * @param state - Current products state
     * @param action - Payload containing error message
     */
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },

    /**
     * Set Search Query Action
     * 
     * Updates the search query and applies filters.
     * 
     * @param state - Current products state
     * @param action - Payload containing search query string
     */
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
      productsSlice.caseReducers.applyFilters(state)
    },

    /**
     * Set Selected Category Action
     * 
     * Updates the selected category filter and applies filters.
     * 
     * @param state - Current products state
     * @param action - Payload containing selected category string
     */
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
      productsSlice.caseReducers.applyFilters(state)
    },

    /**
     * Set Sort By Action
     * 
     * Updates the sorting method and applies filters.
     * 
     * @param state - Current products state
     * @param action - Payload containing sort method
     */
    setSortBy: (state, action) => {
      state.sortBy = action.payload
      productsSlice.caseReducers.applyFilters(state)
    },

    /**
     * Apply Filters Action
     * 
     * Applies search, category, and sort filters to products.
     * This is called internally by other actions.
     * 
     * @param state - Current products state
     */
    applyFilters: (state) => {
      // Start with all products
      let filtered = [...state.products]

      // Apply search filter
      if (state.searchQuery) {
        const searchTerm = state.searchQuery.toLowerCase()
        filtered = filtered.filter((product) => {
          // Safe string conversion and lowercase for case-insensitive search
          const title = typeof product.title === "string" ? product.title.toLowerCase() : ""
          const description = typeof product.description === "string" ? product.description.toLowerCase() : ""
          const category = typeof product.category === "string" ? product.category.toLowerCase() : ""
          const brand = typeof product.brand === "string" ? product.brand.toLowerCase() : ""

          // Search across title, description, category, and brand
          return (
            title.includes(searchTerm) ||
            description.includes(searchTerm) ||
            category.includes(searchTerm) ||
            brand.includes(searchTerm)
          )
        })
      }

      // Apply category filter
      if (state.selectedCategory) {
        filtered = filtered.filter((product) => product.category === state.selectedCategory)
      }

      // Apply sorting
      switch (state.sortBy) {
        case "price-asc":
          filtered.sort((a, b) => a.price - b.price)
          break
        case "price-desc":
          filtered.sort((a, b) => b.price - a.price)
          break
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case "name":
          filtered.sort((a, b) => {
            // Safe string comparison for sorting
            const titleA = typeof a.title === "string" ? a.title : ""
            const titleB = typeof b.title === "string" ? b.title : ""
            return titleA.localeCompare(titleB)
          })
          break
      }

      // Update filtered products
      state.filteredProducts = filtered
    },
  },
})

// Export action creators for use in components
export const { setLoading, setProducts, setError, setSearchQuery, setSelectedCategory, setSortBy } =
  productsSlice.actions

// Export reducer for store configuration
export default productsSlice.reducer

/**
 * Memoized Selector for Filtered Products
 * 
 * This selector uses Reselect to create a memoized selector that:
 * - Only recalculates when input values change
 * - Improves performance by avoiding unnecessary re-renders
 * - Applies search, category, and sort filters
 * 
 * @param state - Root Redux state
 * @returns Filtered and sorted array of products
 */
export const selectFilteredProducts = createSelector(
  [
    // Input selectors - these values are watched for changes
    (state) => state.products.products,
    (state) => state.products.searchQuery,
    (state) => state.products.selectedCategory,
    (state) => state.products.sortBy,
  ],
  // Result function - only runs when input values change
  (products, searchQuery, selectedCategory, sortBy) => {
    let filtered = products

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
      case "name":
      default:
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  },
)

// Updated: feat: Add products Redux slice with search functionality
