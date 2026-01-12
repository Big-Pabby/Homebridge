"use client";

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent, ChangeEvent } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const router = useRouter();
  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, idx) => {
      if (idx < 6) newOtp[idx] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or first empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      alert("Please enter complete OTP");
      return;
    }

    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Verifying OTP:", otpValue);
      alert(`OTP ${otpValue} submitted for verification`);
        router.push("/admin/create-password");
      setIsVerifying(false);
    }, 1500);
  };

  const handleResend = () => {
    if (!canResend) return;
    
    setOtp(["", "", "", "", "", ""]);
    setTimer(30);
    setCanResend(false);
    inputRefs.current[0]?.focus();
    console.log("OTP resent");
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="h-screen flex items-center gap-6 justify-between bg-white px-4">
      <div className="w-full md:px-16 md:w-5/12">
        {/* Top Section with Icon and Welcome Text */}
        <div className="flex flex-col items-center gap-8 mb-8">
          {/* Email Icon */}
          <div className="w-21 h-21 rounded-full bg-purple-50 flex items-center justify-center">
            <div className="w-13 h-13 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Icon
                icon="ic:round-email"
                width="24"
                height="24"
                style={{ color: "#7d00ff" }}
              />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="flex flex-col gap-2 text-center">
            <h1
              className="text-2xl font-semibold text-gray-900"
              style={{ letterSpacing: "-0.48px" }}
            >
              OTP Verification
            </h1>
            <p
              className="text-base font-normal text-gray-500"
              style={{ letterSpacing: "-0.16px" }}
            >
              We have sent a verification code to email address{" "}
              <span className="text-gray-900 font-medium">johndoe@gmail.com</span>
            </p>
          </div>
        </div>

        {/* OTP Input Section */}
        <div className="flex flex-col gap-6">
          {/* OTP Inputs */}
          <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el : any) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-14 h-14 text-center text-xl font-semibold border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none transition-colors"
                style={{
                  borderColor: digit ? "#7d00ff" : undefined,
                }}
              />
            ))}
          </div>

          {/* Verify Button */}
          <div className="flex flex-col gap-6 mt-2">
            <button
              onClick={handleVerify}
              disabled={!isComplete || isVerifying}
              className="w-full h-13 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full text-base font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <Icon icon="eos-icons:loading" width="20" height="20" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </button>

            {/* Resend Link */}
            <div className="flex items-center justify-center gap-1">
              {canResend ? (
                <>
                  <span className="text-base font-normal text-gray-500">
                    Didn't receive code?
                  </span>
                  <button
                    onClick={handleResend}
                    className="text-base font-medium text-purple-600 hover:underline"
                  >
                    Resend
                  </button>
                </>
              ) : (
                <>
                  <span className="text-base font-normal text-gray-500">
                    Resend code in
                  </span>
                  <span className="text-base font-medium text-purple-600">
                    {formatTime(timer)}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <img
        className="md:w-7/12 object-cover h-full w-full overflow-y-hidden hidden md:block"
        src="/admin/auth.svg"
        alt="Authentication illustration"
      />
    </div>
  );
}