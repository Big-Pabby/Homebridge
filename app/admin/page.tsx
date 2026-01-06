"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import UserAvatarIcon from "@/public/icons/user-avatar.svg"

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-[467px]">
        {/* Top Section with Icon and Welcome Text */}
        <div className="flex flex-col items-center gap-8 mb-8">
          {/* User Avatar Icon */}
          <div className="w-20 h-20 rounded-full bg-[#f5f3f7] flex items-center justify-center">
            <UserAvatarIcon className="w-5 h-5.5" style={{ color: '#7d00ff' }} />
          </div>

          {/* Welcome Text */}
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold text-[#0e0e0f]" style={{ letterSpacing: '-0.48px' }}>
              Welcome back
            </h1>
            <p className="text-base font-normal text-[#6b7280]" style={{ letterSpacing: '-0.16px' }}>
              Glad to see you again, Login to your account
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-4">
          {/* Forms Container */}
          <div className="flex flex-col gap-4">
            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-medium text-[#0e0e0f]" style={{ letterSpacing: '-0.14px' }}>
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Johndoe@gmail.com"
                className="h-13 rounded-xl border-[#cfd2d6] text-sm"
                style={{ letterSpacing: '-0.06px' }}
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-sm font-medium text-[#0e0e0f]" style={{ letterSpacing: '-0.14px' }}>
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  className="h-13 rounded-xl border-[#cfd2d6] pr-10 text-sm"
                  style={{ letterSpacing: '-0.06px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#0e0e0f] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                className="border-[#cfd2d6]"
              />
              <Label
                htmlFor="remember"
                className="text-sm font-medium text-[#6b7280] cursor-pointer"
                style={{ letterSpacing: '-0.14px' }}
              >
                Remember me
              </Label>
            </div>
            <Link
              href="/admin/forgot-password"
              className="text-sm font-medium text-[#7d00ff] hover:underline"
              style={{ letterSpacing: '-0.14px' }}
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button and Sign Up */}
          <div className="flex flex-col gap-9 mt-4">
            <Button
              className="w-full h-13 bg-[#7d00ff] hover:bg-[#7d00ff]/90 text-white rounded-full text-base font-medium"
              style={{ letterSpacing: '-0.16px' }}
            >
              Login
            </Button>

            {/* Sign Up Link */}
            <div className="flex items-center justify-center gap-1">
              <span className="text-base font-normal text-[#6b7280]" style={{ letterSpacing: '-0.16px' }}>
                Don&apos;t have an account?
              </span>
              <Link
                href="/admin/signup"
                className="text-base font-medium text-[#7d00ff] hover:underline"
                style={{ letterSpacing: '-0.16px' }}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}