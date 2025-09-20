import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Home } from "lucide-react"

/**
 * NotFoundPage Component
 * 
 * Displays a user-friendly 404 error page that shows:
 * - The invalid route that was attempted
 * - Clear error messaging
 * - Navigation back to home page
 * - Hidden navigation to avoid confusion
 */
export default function NotFoundPage() {
  // Get the current location to display the invalid route
  const location = useLocation()
  const invalidPath = location.pathname

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Error Icon and Status Code */}
        <div className="space-y-4">
          <div className="mx-auto w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>
          <h1 className="text-6xl font-bold text-foreground">404</h1>
        </div>

        {/* Error Details Card */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                The page you're looking for doesn't exist.
              </p>
              {/* Display the invalid route that was attempted */}
              <div className="bg-muted/50 rounded-lg p-3 border">
                <p className="text-sm text-muted-foreground mb-1">Invalid route:</p>
                <code className="text-sm font-mono text-destructive bg-destructive/10 px-2 py-1 rounded">
                  {invalidPath}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Button */}
        <Button asChild size="lg" className="w-full">
          <Link to="/">
            <Home className="w-4 h-4 mr-2" />
            Go Back Home
          </Link>
        </Button>

        {/* Additional Help Text */}
        <p className="text-xs text-muted-foreground">
          If you think this is an error, please check the URL or contact support.
        </p>
      </div>
    </div>
  )
}

// Updated: feat: Add 404 NotFound page with proper error details
