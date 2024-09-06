"use client";

import PhoneLogin from "@/components/PhoneLogin";

export default function PhoneVerification() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 sm:p-8 md:p-10 flex items-center justify-center">
      <div className="max-w-[90rem] mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-green-500">
          Let's Get Started
        </h1>

        <h2 className="text-xl sm:text-2xl font-semibold mb-8 text-gray-300">
          To kick off your music sharing journey, we just need your phone number.
        </h2>

        <div className="flex justify-center">
          <PhoneLogin />
        </div>
      </div>
    </div>
  );
}