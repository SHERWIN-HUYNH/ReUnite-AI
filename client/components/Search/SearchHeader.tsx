'use client'
import { memo } from 'react'

const SearchHeader = memo(() => {
  return (
    <div className="text-center space-y-3 mb-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        Search Missing Persons
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Use our advanced search tools to find missing individuals by photo or description
      </p>
    </div>
  );
});

SearchHeader.displayName = 'SearchHeader';

export default SearchHeader;
