import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

type StatCardProps = {
  type: 'appointments' | 'pending' | 'cancelled'
  count: number
  label: string
  icon: string
}

export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  const getGradient = () => {
    switch (type) {
      case 'appointments':
        return 'from-blue-500 to-indigo-600'
      case 'pending':
        return 'from-yellow-500 to-orange-600'
      case 'cancelled':
        return 'from-red-500 to-pink-600'
      default:
        return 'from-purple-500 to-pink-600'
    }
  }

  const getBgColor = () => {
    switch (type) {
      case 'appointments':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
      case 'pending':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      case 'cancelled':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      default:
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
    }
  }

  const getTextColor = () => {
    switch (type) {
      case 'appointments':
        return 'text-blue-600 dark:text-blue-400'
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'cancelled':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-purple-600 dark:text-purple-400'
    }
  }

  return (
    <div
      className={clsx(
        'group relative overflow-hidden rounded-2xl border-2 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1',
        getBgColor()
      )}
    >
      {/* Gradient background overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Top section with icon and count */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h2 className={clsx(
              'text-4xl font-bold transition-all duration-300',
              getTextColor()
            )}>
              {count}
            </h2>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {label}
            </p>
          </div>
          
          {/* Animated icon */}
          <div className={`p-3 rounded-xl bg-gradient-to-br ${getGradient()} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Image
              src={icon}
              height={24}
              width={24}
              alt={label}
              className="w-6 h-6 brightness-0 invert"
            />
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className={`flex items-center gap-1 text-xs font-medium ${
            type === 'appointments' ? 'text-blue-600 dark:text-blue-400' :
            type === 'pending' ? 'text-yellow-600 dark:text-yellow-400' :
            'text-red-600 dark:text-red-400'
          }`}>
            {type === 'appointments' ? (
              <>
                <TrendingUp className="w-3 h-3" />
                <span>Active</span>
              </>
            ) : type === 'pending' ? (
              <>
                <Minus className="w-3 h-3" />
                <span>Pending</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-3 h-3" />
                <span>Low</span>
              </>
            )}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Hôm nay
          </span>
        </div>
      </div>

      {/* Decorative corner */}
      <div className={`absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-gradient-to-br ${getGradient()} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
    </div>
  )
}
