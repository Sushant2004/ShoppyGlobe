"use client"


import { useState, useEffect, useRef, useMemo } from "react"

/**
 * VirtualList Props
 * @param {Array} items - Array of items to render
 * @param {number} itemHeight - Height of each item
 * @param {number} containerHeight - Height of the container
 * @param {Function} renderItem - Function to render each item
 * @param {number} [overscan] - Number of items to render outside visible area
 */

export function VirtualList({ items, itemHeight, containerHeight, renderItem, overscan = 5 }) {
  const [scrollTop, setScrollTop] = useState(0)
  const scrollElementRef = useRef(null)

  const { visibleItems, totalHeight, offsetY } = useMemo(() => {
    const visibleStart = Math.floor(scrollTop / itemHeight)
    const visibleEnd = Math.min(visibleStart + Math.ceil(containerHeight / itemHeight), items.length - 1)

    const start = Math.max(0, visibleStart - overscan)
    const end = Math.min(items.length - 1, visibleEnd + overscan)

    return {
      visibleItems: items.slice(start, end + 1).map((item, index) => ({
        item,
        index: start + index,
      })),
      totalHeight: items.length * itemHeight,
      offsetY: start * itemHeight,
    }
  }, [items, itemHeight, scrollTop, containerHeight, overscan])

  useEffect(() => {
    const scrollElement = scrollElementRef.current
    if (!scrollElement) return

    const handleScroll = () => {
      setScrollTop(scrollElement.scrollTop)
    }

    scrollElement.addEventListener("scroll", handleScroll)
    return () => scrollElement.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={scrollElementRef} style={{ height: containerHeight, overflow: "auto" }}>
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map(({ item, index }) => (
            <div key={index} style={{ height: itemHeight }}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Updated: feat: Add virtual list component for performance
