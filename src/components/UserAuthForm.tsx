"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { Loader2 } from "lucide-react"

// Google Icon SVG Component
const GoogleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

export function UserAuthForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn("google", { callbackUrl: "/" })
    } catch (error) {
      console.error("Sign-in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Google Sign-in Button */}
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleGoogleSignIn}
        className="relative bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30 py-3 h-12 flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <GoogleIcon className="h-5 w-5" />
        )}
        <span className="text-base font-medium">Continue with Google</span>
      </Button>

      {/* Divider */}
      <div className="relative my-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 px-4 py-1 rounded-full text-gray-300 backdrop-blur-sm">
            AI-Powered Learning Platform
          </span>
        </div>
      </div>

      {/* Additional Sign-in Options (Optional) */}
      <div className="space-y-3">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          className="w-full bg-white/5 backdrop-blur-sm border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 py-3 h-12 transition-all duration-200"
        >
          <span className="text-base">Sign in with Email</span>
        </Button>
      </div>

      {/* Sign-up Link */}
      <div className="text-center">
        <p className="text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <button className="text-blue-300 hover:text-blue-200 underline underline-offset-4 transition-colors">
            Sign up here
          </button>
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 pt-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-xs text-gray-400">Secure</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span className="text-xs text-gray-400">Fast Setup</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          <span className="text-xs text-gray-400">AI-Powered</span>
        </div>
      </div>
    </div>
  )
}