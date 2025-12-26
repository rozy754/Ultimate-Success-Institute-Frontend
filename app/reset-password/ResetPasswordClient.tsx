"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { api } from "@/lib/api";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const router = useRouter();
  const { toast } = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) return "Password must be at least 8 characters long";
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pwd)) {
      return "Password must contain uppercase, lowercase, and a number";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setConfirmPasswordError("");

    const pwdError = validatePassword(password);
    if (pwdError) {
      setPasswordError(pwdError);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    if (!token) {
      toast({
        title: "Invalid or expired link",
        description: "This password reset link is invalid or has expired.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("🔐 RESET PASSWORD");
      console.log("TOKEN:", token);

      // 🔥 SAME api.ts STYLE AS LOGIN & FORGOT PASSWORD
      const resp = await api.post<{
        success: boolean;
        message?: string;
      }>("/auth/reset-password", {
        token,
        password,
        confirmPassword,
      });

      console.log("🌐 RESPONSE:", resp);

      if (resp?.success) {
        toast({
          title: "Password updated",
          description:
            "Your password has been successfully updated. Please login again.",
        });
        router.push("/login");
      } else {
        throw new Error(resp?.message || "Reset failed");
      }
    } catch (err: any) {
      console.error("Reset password error:", err);

      toast({
        title: "Reset failed",
        description: err.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow border">
        <h2 className="text-2xl font-bold text-center mb-2">
          Reset your password
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
              disabled={isLoading}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none ${
                passwordError
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-300 focus:ring-green-500 focus:border-green-500"
              }`}
            />
            {passwordError && (
              <p className="mt-1 text-xs text-red-600">{passwordError}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmPasswordError) setConfirmPasswordError("");
              }}
              disabled={isLoading}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none ${
                confirmPasswordError
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-300 focus:ring-green-500 focus:border-green-500"
              }`}
            />
            {confirmPasswordError && (
              <p className="mt-1 text-xs text-red-600">
                {confirmPasswordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>

          <div className="text-center">
            <a
              href="/login"
              className="text-sm text-indigo-600 hover:underline"
            >
              Back to login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
