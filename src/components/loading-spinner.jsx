import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * LoadingSpinner Props
 * @param {string} [className] - Additional CSS classes
 * @param {string} [size] - Size: "sm" | "md" | "lg"
 */

export function LoadingSpinner({ className, size = "md" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  }

  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className={cn("animate-spin text-muted-foreground", sizeClasses[size], className)} />
    </div>
  )
}
// Updated: feat: Add loading spinner component
