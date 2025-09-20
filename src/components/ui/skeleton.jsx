import { cn } from "@/lib/utils"

/**
 * Skeleton Component - Shadcn/ui
 * 
 * A simple skeleton component for loading states.
 */

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// Updated: feat: Add skeleton component for loading states
