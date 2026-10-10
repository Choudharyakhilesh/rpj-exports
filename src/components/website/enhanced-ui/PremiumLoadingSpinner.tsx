import React from "react";

export function PremiumLoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-pink-200 rounded-full animate-pulse"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="relative aspect-[3/4] bg-neutral-200">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300"></div>
      </div>
      <div className="p-6 space-y-3">
        <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
        <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
        <div className="h-6 bg-neutral-200 rounded w-1/3"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-neutral-200 rounded-full"></div>
          <div className="h-8 w-8 bg-neutral-200 rounded-full"></div>
          <div className="h-8 w-8 bg-neutral-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export function PageLoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-100 to-peach-100 rounded-full">
            <div className="w-10 h-10 border-4 border-transparent border-t-pink-500 rounded-full animate-spin"></div>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-neutral-900 mb-2">
          Loading Summer Fashion...
        </h2>
        <p className="text-neutral-600">
          Preparing your perfect summer collection
        </p>
      </div>
    </div>
  );
}