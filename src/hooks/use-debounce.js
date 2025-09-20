// Hook for debouncing values - useful for search inputs and form validation

"use client"

import { useState, useEffect } from "react"

// Delays updating a value until after the delay period
// If the value changes before delay completes, timer resets
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Updated: feat: Add useDebounce hook for search optimization
