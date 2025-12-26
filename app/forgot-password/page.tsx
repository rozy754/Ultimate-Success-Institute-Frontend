"use client";

import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/hooks/use-toast";
import { api } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { toast } = useToast();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    // client-side validation
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const resp = await api.post<{
        success: boolean;
        message?: string;
      }>("/auth/forgot-password", { email });

      // Always generic success (security)
      if (resp?.success) {
        setIsSubmitted(true);
        toast({
          title: "Check your inbox",
          description:
            "If an account exists, a reset link has been sent.",
        });
      } else {
        throw new Error("Failed to send reset email");
      }
    } catch (err: any) {
      console.error("Forgot password error:", err);

      toast({
        title: "Error",
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
          Forgot password?
        </h2>

        <p className="text-center text-sm text-gray-600 mb-6">
          {isSubmitted
            ? "Check your email for the reset link."
            : "We’ll send you instructions to reset your password."}
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                disabled={isLoading}
                className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none ${
                  emailError
                    ? "border-red-500 ring-1 ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                }`}
                placeholder="name@example.com"
              />

              {emailError && (
                <p className="mt-1 text-sm text-red-600">
                  {emailError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {isLoading ? "Sending..." : "Reset password"}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-sm text-indigo-600 hover:underline"
            >
              Didn’t receive an email? Try again
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-indigo-600"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
