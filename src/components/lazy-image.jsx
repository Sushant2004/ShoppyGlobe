"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

/**
 * LazyImage Props
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text
 * @param {string} [className] - Additional CSS classes
 * @param {string} [placeholder] - Placeholder image URL
 */

export function LazyImage({ src, alt, className, placeholder = "/placeholder.svg" }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
      {/* Placeholder */}
      <img
        src={placeholder || "/placeholder.svg"}
        alt=""
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-0" : "opacity-100",
        )}
      />

      {/* Actual image */}
      {isInView && (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  )
}

// Updated: feat: Add lazy loading for images with Intersection Observer
