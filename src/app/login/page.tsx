"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      console.error("Login error:", error);
      // Handle the error (e.g., display an error message)
    } else {
      // If there's no error, redirect to the home page
      router.push("/");
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Login</h1>
        <p className="text-gray-600 mb-6">
          We are handling your login process. Please wait...
        </p>
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 mx-auto text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v7l3 3m-3-3a8 8 0 11-8 8 8 8 0 018-8z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
