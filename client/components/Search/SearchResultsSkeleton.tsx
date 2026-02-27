'use client'
import { memo } from 'react'

const SearchResultsSkeleton = memo(() => {
  return (
    <div className="space-y-8">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="bg-gray-200 dark:bg-slate-700 p-2 rounded-lg w-10 h-10 animate-pulse" />
          <div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="h-10 w-32 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden"
          >
            {/* Image skeleton */}
            <div className="h-52 bg-gray-200 dark:bg-slate-700 animate-pulse" />
            
            {/* Content skeleton */}
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div className="h-6 w-32 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="h-6 w-20 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse" />
              </div>
              
              <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
              
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <div className="h-8 w-28 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse" />
                <div className="h-8 w-20 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

SearchResultsSkeleton.displayName = 'SearchResultsSkeleton';

export default SearchResultsSkeleton;
