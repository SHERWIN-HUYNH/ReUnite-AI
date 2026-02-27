'use client'
import { useCallback, useEffect, useState, useMemo } from "react"
import ListPeople from "./ListPeople";
import Pagination from "./Pagination";
import { toast } from "sonner";
import { MissingPost } from "@/types/interface";
import { Search, Users, Clock, Sparkles } from "lucide-react";
import { calculateAgeGroup, calculateTimeMissing, debounce } from "@/lib/filter";
import ImageUpload from "./Search/ImageUpload";
import FilterSelect from "./Search/FilterSelect";
import SearchHeader from "./Search/SearchHeader";
import SearchResultsSkeleton from "./Search/SearchResultsSkeleton";
import ErrorBoundary from "./ErrorBoundary";
import { usePosts } from "@/hooks/usePosts";
import { useImageSearch } from "@/hooks/useImageSearch";

// Constants
const AGE_GROUPS = ['All Ages', 'Child (0-12)', 'Teen (13-17)', 'Adult (18+)'] as const;
const GENDERS = ['Any Gender', 'Male', 'Female'] as const;
const TIME_PERIODS = ['Any Time', 'Less than 1 month', '1-6 months', '6 months-1year', 'Greater than 1 year'] as const;
const ITEMS_PER_PAGE = 6;

// Types
interface FormState {
  description: string;
  ageGroup: string;
  gender: string;
  timeMissing: string;
}

// Helper function
const hasNoFilters = (form: FormState): boolean => 
  !form.description && 
  form.ageGroup === 'All Ages' && 
  form.gender === 'Any Gender' && 
  form.timeMissing === 'Any Time';

export const MainSearch = () => {
  // Use custom hooks
  const { posts, isLoading: isLoadingPosts } = usePosts();
  const { searchByImage, isSearching } = useImageSearch();
  
  // Local state
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState<MissingPost[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formState, setFormState] = useState<FormState>({
    description: '',
    ageGroup: 'All Ages',
    gender: 'Any Gender',
    timeMissing: 'Any Time',
  });

  const isLoading = isLoadingPosts || isSearching;

  // Update filtered posts when posts change
  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  useEffect(() => {
    if (!uploadedFile) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(uploadedFile);
    setPreviewUrl(url);
    toast.success('Image uploaded successfully.');
    return () => URL.revokeObjectURL(url);
  }, [uploadedFile]);

  // Memoize pagination calculations
  const { totalPages, displayedPosts } = useMemo(() => {
    const total = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
    const displayed = filteredPosts.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
    return { totalPages: total, displayedPosts: displayed };
  }, [filteredPosts, currentPage]);

  // Create debounced filter function with proper cleanup
  const debouncedFilterPosts = useMemo(
    () => debounce((postsToFilter: MissingPost[], form: FormState) => {
      if (hasNoFilters(form)) {
        setFilteredPosts(postsToFilter);
        return;
      }

      const filtered = postsToFilter.filter((post) => {
        // Description match
        if (form.description) {
          const searchLower = form.description.toLowerCase();
          const descMatch = post.description?.toLowerCase().includes(searchLower);
          const nameMatch = post.name.toLowerCase().includes(searchLower);
          if (!descMatch && !nameMatch) return false;
        }

        // Age match
        if (form.ageGroup !== 'All Ages') {
          if (calculateAgeGroup(post.dob || '') !== form.ageGroup) return false;
        }

        // Gender match
        if (form.gender !== 'Any Gender') {
          if (post.gender.toLowerCase() !== form.gender.toLowerCase()) return false;
        }

        // Time missing match
        if (form.timeMissing !== 'Any Time') {
          if (calculateTimeMissing(post.missing_since) !== form.timeMissing) return false;
        }

        return true;
      });

      setFilteredPosts(filtered);
      setCurrentPage(1);
    }, 300),
    []
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      // Cleanup handled by debounce function itself
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let postsToFilter = posts;

    if (uploadedFile) {
      postsToFilter = await searchByImage(uploadedFile);
    } else if (hasNoFilters(formState)) {
      toast.error('Please provide at least one search criterion or upload an image.');
      return;
    }

    debouncedFilterPosts(postsToFilter, formState);
  };

  // Memoized event handlers
  const clearImage = useCallback(() => {
    setUploadedFile(null);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleFileChange = useCallback((file: File) => {
    setUploadedFile(file);
  }, []);

  return (
    <ErrorBoundary>
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchHeader />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Compact Search Container */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Search Missing Persons</h2>
                    <p className="text-sm text-white/80">Use photo recognition or text filters</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="p-6 space-y-6">
              {/* Two Column Layout: Image Upload | Search Filters */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Image Upload */}
                <div className="flex flex-col">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                      <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    Search by Photo
                  </label>
                  <div className="flex-1">
                    <ImageUpload 
                      previewUrl={previewUrl}
                      onFileChange={handleFileChange}
                      onClear={clearImage}
                    />
                  </div>
                </div>

                {/* Right: Text Filters */}
                <div className="flex flex-col space-y-4">
                  {/* Description Search */}
                  <div>
                    <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <Search className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      Search by Description
                    </label>
                    <div className="relative group/search">
                      <input
                        id="description"
                        type="text"
                        name="description"
                        value={formState.description}
                        onChange={handleInputChange}
                        placeholder="Enter name, features, clothing..."
                        className="w-full px-4 py-3 pr-10 border-2 border-gray-200 dark:border-slate-600 rounded-xl 
                          focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 dark:bg-slate-700 dark:text-white 
                          transition-all duration-300 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-500
                          placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/search:text-indigo-600 transition-colors" />
                    </div>
                  </div>

                  {/* Additional Filters */}
                  <div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <FilterSelect
                        name="ageGroup"
                        value={formState.ageGroup}
                        options={AGE_GROUPS}
                        onChange={handleInputChange}
                        icon={Users}
                        label="Age Group"
                      />
                      <FilterSelect
                        name="gender"
                        value={formState.gender}
                        options={GENDERS}
                        onChange={handleInputChange}
                        icon={Users}
                        label="Gender"
                      />
                      <FilterSelect
                        name="timeMissing"
                        value={formState.timeMissing}
                        options={TIME_PERIODS}
                        onChange={handleInputChange}
                        icon={Clock}
                        label="Time Missing"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                    hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 
                    disabled:from-gray-400 disabled:to-gray-500 
                    text-white px-8 py-3 rounded-xl font-semibold
                    transition-all duration-300 shadow-lg hover:shadow-xl 
                    transform hover:-translate-y-0.5 hover:scale-105
                    disabled:cursor-not-allowed disabled:transform-none disabled:scale-100
                    flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>Search Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Results Section */}
        <div className="pt-4">
          {isLoading ? (
            <SearchResultsSkeleton />
          ) : (
            <>
              <ListPeople ListPosts={displayedPosts} />
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};