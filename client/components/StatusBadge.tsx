'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle, ChevronDown } from 'lucide-react';

type PostStatus = 'pending' | 'finding' | 'found' | 'disable';

interface StatusBadgeProps {
  status: PostStatus;
  onChange?: (newStatus: PostStatus) => void;
  editable?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  pending: {
    label: 'Chờ duyệt',
    icon: Clock,
    className: 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200',
    dotColor: 'bg-yellow-500'
  },
  finding: {
    label: 'Đang tìm',
    icon: AlertCircle,
    className: 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200',
    dotColor: 'bg-blue-500'
  },
  found: {
    label: 'Đã tìm thấy',
    icon: CheckCircle,
    className: 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200',
    dotColor: 'bg-green-500'
  },
  disable: {
    label: 'Vô hiệu',
    icon: XCircle,
    className: 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200',
    dotColor: 'bg-gray-500'
  }
};

export default function StatusBadge({ 
  status, 
  onChange, 
  editable = false,
  size = 'md' 
}: StatusBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const config = statusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const handleStatusChange = (newStatus: PostStatus) => {
    if (onChange) {
      onChange(newStatus);
    }
    setIsOpen(false);
  };

  if (!editable) {
    return (
      <span className={`inline-flex items-center gap-2 rounded-full font-semibold border ${config.className} ${sizeClasses[size]}`}>
        <Icon className={iconSizes[size]} />
        {config.label}
      </span>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-full font-semibold border transition-all ${config.className} ${sizeClasses[size]}`}
      >
        <Icon className={iconSizes[size]} />
        {config.label}
        <ChevronDown className={`${iconSizes[size]} transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 z-20 overflow-hidden">
            <div className="p-2 bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide px-2">
                Thay đổi trạng thái
              </p>
            </div>
            <div className="py-2">
              {(Object.keys(statusConfig) as PostStatus[]).map((statusKey) => {
                const itemConfig = statusConfig[statusKey];
                const ItemIcon = itemConfig.icon;
                const isSelected = statusKey === status;

                return (
                  <button
                    key={statusKey}
                    onClick={() => handleStatusChange(statusKey)}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                    disabled={isSelected}
                  >
                    <div className={`w-2 h-2 rounded-full ${itemConfig.dotColor}`} />
                    <ItemIcon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`} />
                    <span className={`font-medium flex-1 text-left ${
                      isSelected 
                        ? 'text-indigo-600 dark:text-indigo-400' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {itemConfig.label}
                    </span>
                    {isSelected && (
                      <CheckCircle className="w-4 h-4 text-indigo-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
