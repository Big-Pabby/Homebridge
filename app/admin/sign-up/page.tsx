"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Code, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import UserAvatarIcon from "@/public/icons/user-avatar.svg";

// Sign Up As Selection Component
interface SignUpAsSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
}

function SignUpAsSelector({
  value,
  onChange,
  onContinue,
}: SignUpAsSelectorProps) {
  const options = [
    {
      id: "admin",
      icon: User,
      title: "An Admin",
      description:
        "Manage the platform, oversee activities, handle issues, payments, and interact with full access.",
    },
    {
      id: "developer",
      icon: Code,
      title: "As Developer",
      description:
        "List projects, update project progress, communicate with buyers, and manage payments easily.",
    },
    {
      id: "partner",
      icon: Users,
      title: "An Verification Partner",
      description:
        "Manage the platform, oversee activities, handle issues, payments, and interact with full access.",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto py-8">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#f5f3f7] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
          <User className="w-6 h-6 text-[#7d00ff]" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[#0e0e0f] mb-1">
          Who would you like to sign up as
        </h2>
        <p className="text-sm text-[#6b7280]">
          Select your role to continue access
        </p>
      </div>

      {/* Radio Options */}
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="w-full space-y-3"
      >
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              value === option.id
                ? "border-[#7d00ff] bg-[#f5f3f7]"
                : "border-[#e5e7eb] bg-white hover:border-[#d1d5db]"
            }`}
          >
            <RadioGroupItem value={option.id} className="mt-1" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <option.icon className="w-4 h-4 text-[#7d00ff]" />
                <span className="font-medium text-[#0e0e0f]">
                  {option.title}
                </span>
              </div>
              <p className="text-xs text-[#6b7280] leading-relaxed">
                {option.description}
              </p>
            </div>
          </label>
        ))}
      </RadioGroup>

      {/* Continue Button */}
      <Button
        onClick={onContinue}
        disabled={!value}
        className="w-full h-12 bg-[#7d00ff] hover:bg-[#7d00ff]/90 text-white rounded-full text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </Button>
    </div>
  );
}

// Main Sign Up Page with Integration
export default function AdminSignUpPage() {
  const [step, setStep] = useState<"select" | "form">("select");
  const [userRole, setUserRole] = useState<string>("");

  if (step === "select") {
    return (
      <div className="min-h-screen flex items-center justify-between bg-white">
        <div className="w-full md:w-5/12 px-4 md:px-16">
          <SignUpAsSelector
            value={userRole}
            onChange={setUserRole}
            onContinue={() => setStep("form")}
          />
        </div>
        <img
          className="hidden md:block md:w-7/12 object-cover h-screen"
          src="/admin/auth.svg"
          alt=""
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-between bg-white">
      <div className="w-full max-w-[520px] mx-auto md:w-5/12 px-4 md:px-16 py-8">
        {/* Back Button */}
        <button
          onClick={() => setStep("select")}
          className="mb-6 text-sm text-[#6b7280] hover:text-[#7d00ff] flex items-center gap-2"
        >
          ← Back to role selection
        </button>

        {/* Top Section with Icon and Welcome Text */}
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* User Avatar Icon */}
          <div className="w-20 h-20 rounded-full bg-[#f5f3f7] flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
              <UserAvatarIcon
                className="w-6 h-6"
                style={{ color: "#7d00ff" }}
              />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold text-[#0e0e0f]">
              Create Account
            </h1>
            <p className="text-base font-normal text-[#6b7280]">
              Enter your details to sign up as{" "}
              <span className="font-medium text-[#7d00ff]">
                {userRole === "admin"
                  ? "Admin"
                  : userRole === "developer"
                  ? "Developer"
                  : "Partner"}
              </span>
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-4">
          {/* Forms Container */}
          <div className="flex flex-col gap-4">
            {/* Full Name Input */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-[#0e0e0f]"
              >
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="h-12 rounded-xl bg-white border-[#cfd2d6] text-sm"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-[#0e0e0f]"
              >
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-12 rounded-xl bg-white border-[#cfd2d6] text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <Link href={"/admin/otp-verification"}>
              <Button className="w-full h-12 bg-[#7d00ff] hover:bg-[#7d00ff]/90 text-white rounded-full text-base font-semibold">
                Register
              </Button>
            </Link>

            {/* Sign In Link */}
            <div className="flex items-center justify-center gap-1">
              <span className="text-base font-normal text-[#6b7280]">
                Already have an account?
              </span>
              <Link
                href="/admin"
                className="text-base font-medium text-[#7d00ff] hover:underline"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <img
        className="hidden md:block md:w-7/12 object-cover h-screen"
        src="/admin/auth.svg"
        alt=""
      />
    </div>
  );
}
