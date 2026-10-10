'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const BlogsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
        >
          {/* Image Skeleton */}
          <Skeleton className="h-60 w-full bg-gray-200" />

          {/* Content */}
          <div className="p-3 space-y-3">
            {/* Title */}
            <Skeleton className="h-6 w-3/4 bg-gray-200" />

            {/* Description */}
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-5/6 bg-gray-200" />

            {/* Tags */}
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
              <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />
              <Skeleton className="h-6 w-14 rounded-full bg-gray-200" />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-4 w-24 bg-gray-200" />
              <Skeleton className="h-4 w-20 bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
