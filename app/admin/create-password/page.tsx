"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@iconify/react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="h-screen flex items-center gap-6 justify-between bg-white px-4">
      <div className="w-full md:px-16 md:w-5/12">
        {/* Top Section with Icon and Welcome Text */}
        <div className="flex flex-col items-center gap-8 mb-8">
          {/* User Avatar Icon */}
          <div className="w-21 h-21 rounded-full bg-[#f5f3f7] flex items-center justify-center">
            <div className="w-13 h-13 rounded-full bg-white flex items-center justify-center">
                <Icon icon="tabler:lock-filled" width="20" height="20"  style={{color: "#7d00ff"}} />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="flex flex-col gap-2 text-center">
            <h1
              className="text-2xl font-semibold text-[#0e0e0f]"
              style={{ letterSpacing: "-0.48px" }}
            >
              Create Password
            </h1>
            <p
              className="text-base font-normal text-[#6b7280]"
              style={{ letterSpacing: "-0.16px" }}
            >
              Secure your account with a strong passwod
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-4">
          {/* Forms Container */}
          <div className="flex flex-col gap-4">
           
            {/* Password Input */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-[#0e0e0f]"
                style={{ letterSpacing: "-0.14px" }}
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-13 rounded-xl bg-white! border-[#cfd2d6] pr-10 text-sm"
                  
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
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-[#0e0e0f]"
                style={{ letterSpacing: "-0.14px" }}
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-13 rounded-xl bg-white! border-[#cfd2d6] pr-10 text-sm"
                  
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

        

          {/* Login Button and Sign Up */}
          <div className="flex flex-col gap-9 mt-4">
            <Link href={"/admin/dashboard"}>
            <Button
              className="w-full h-13 bg-[#7d00ff] hover:bg-[#7d00ff]/90 text-white rounded-full text-base font-semibold"
             
            >
              Continue
            </Button>
            </Link>
          
          </div>
        </div>
      </div>
      <img
        className="md:w-7/12 object-cover h-full w-full overflow-y-hidden"
        src="/admin/auth.svg"
        alt=""
      />
    </div>
  );
}
