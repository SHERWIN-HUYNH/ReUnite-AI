'use client'
import { memo } from 'react'
import { LucideIcon } from 'lucide-react'

interface FilterSelectProps {
  name: string;
  value: string;
  options: readonly string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  icon: LucideIcon;
  label: string;
}

const FilterSelect = memo(({ 
  name, 
  value, 
  options, 
  onChange, 
  icon: Icon,
  label 
}: FilterSelectProps) => {
  return (
    <div className="space-y-2 group/filter">
      <label 
        htmlFor={name}
        className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2"
      >
        <div className="p-1 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg group-hover/filter:from-indigo-200 group-hover/filter:to-purple-200 dark:group-hover/filter:from-indigo-900/50 dark:group-hover/filter:to-purple-900/50 transition-all">
          <Icon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
        </div>
        {label}
      </label>
      <div className="relative">
        {/* Gradient border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover/filter:opacity-30 blur transition-all duration-300"></div>
        
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="relative w-full appearance-none 
            border-2 border-gray-300 dark:border-slate-600 
            rounded-2xl px-4 py-3.5 pr-11 text-sm
            focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 
            dark:bg-slate-700 dark:text-white 
            transition-all duration-300 cursor-pointer 
            hover:border-indigo-400 dark:hover:border-indigo-500
            hover:shadow-xl hover:shadow-indigo-500/20
            bg-white dark:bg-slate-700 shadow-md
            font-semibold text-gray-900 dark:text-white
            focus:scale-[1.02] active:scale-[0.98]
            backdrop-blur-sm
            hover:bg-gradient-to-br hover:from-white hover:to-indigo-50/30
            dark:hover:from-slate-700 dark:hover:to-indigo-900/20"
        >
          {options.map(option => (
            <option 
              key={option} 
              value={option}
              className="bg-white dark:bg-slate-700 text-gray-900 dark:text-white py-2 rounded-lg"
            >
              {option}
            </option>
          ))}
        </select>
        
        {/* Custom arrow with gradient */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
          <div className="relative p-1.5 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 rounded-lg group-hover/filter:from-indigo-200 group-hover/filter:to-purple-200 dark:group-hover/filter:from-indigo-900/60 dark:group-hover/filter:to-purple-900/60 transition-all duration-300">
            <svg 
              className="w-4 h-4 text-indigo-600 dark:text-indigo-400 transition-all duration-300 group-hover/filter:scale-110 group-hover/filter:rotate-180" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Active indicator */}
        {value !== options[0] && (
          <div className="absolute -top-1.5 -right-1.5 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-sm animate-pulse"></div>
              <div className="relative w-3 h-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full shadow-lg"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

FilterSelect.displayName = 'FilterSelect';

export default FilterSelect;
