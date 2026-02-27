'use client';

import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import {
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Image as ImageIcon,
  MessageSquare,
  FileText,
  AlertCircle,
  Ban,
  Clock
} from 'lucide-react';
import { ActivityLog, ActivityType } from '@/data/mockActivityLogs';

interface ActivityTimelineProps {
  activities: ActivityLog[];
  showAll?: boolean;
  maxItems?: number;
}

const activityConfig: Record<ActivityType, {
  icon: React.ElementType;
  color: string;
  bgColor: string;
  label: string;
}> = {
  created: {
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    label: 'Tạo bài đăng'
  },
  updated: {
    icon: Edit,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
    label: 'Cập nhật'
  },
  status_changed: {
    icon: AlertCircle,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    label: 'Thay đổi trạng thái'
  },
  approved: {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    label: 'Duyệt bài'
  },
  rejected: {
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    label: 'Từ chối'
  },
  disabled: {
    icon: Ban,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    label: 'Vô hiệu hóa'
  },
  deleted: {
    icon: Trash2,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    label: 'Xóa'
  },
  image_added: {
    icon: ImageIcon,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    label: 'Thêm hình ảnh'
  },
  image_removed: {
    icon: ImageIcon,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100 dark:bg-gray-900/30',
    label: 'Xóa hình ảnh'
  },
  comment_added: {
    icon: MessageSquare,
    color: 'text-teal-600',
    bgColor: 'bg-teal-100 dark:bg-teal-900/30',
    label: 'Thêm ghi chú'
  }
};

const getRoleBadge = (role: string) => {
  const roleConfig = {
    admin: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    moderator: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    user: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
  };
  return roleConfig[role as keyof typeof roleConfig] || roleConfig.user;
};

export default function ActivityTimeline({ 
  activities, 
  showAll = false,
  maxItems = 5 
}: ActivityTimelineProps) {
  const displayActivities = showAll ? activities : activities.slice(0, maxItems);

  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Clock className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
        <p className="text-gray-500 dark:text-gray-400">Chưa có hoạt động nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayActivities.map((activity, index) => {
        const config = activityConfig[activity.activity_type];
        const Icon = config.icon;
        const isLast = index === displayActivities.length - 1;

        return (
          <div key={activity.id} className="relative pl-8">
            {/* Timeline line */}
            {!isLast && (
              <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-700" />
            )}

            {/* Icon */}
            <div className={`absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center ${config.bgColor}`}>
              <Icon className={`w-3.5 h-3.5 ${config.color}`} />
            </div>

            {/* Content */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {activity.performed_by.name}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getRoleBadge(activity.performed_by.role)}`}>
                      {activity.performed_by.role === 'admin' ? 'Quản trị' : 
                       activity.performed_by.role === 'moderator' ? 'Kiểm duyệt' : 'Người dùng'}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500">•</span>
                    <span className={`text-sm font-medium ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {format(new Date(activity.timestamp), "dd/MM/yyyy 'lúc' HH:mm", { locale: vi })}
                  </p>
                </div>
              </div>

              {/* Details */}
              {activity.details && (
                <div className="mt-3 space-y-2">
                  {activity.details.old_value && activity.details.new_value && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded font-mono text-xs">
                        {activity.details.old_value}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded font-mono text-xs">
                        {activity.details.new_value}
                      </span>
                    </div>
                  )}
                  {activity.details.reason && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <span className="font-semibold">Lý do: </span>
                        {activity.details.reason}
                      </p>
                    </div>
                  )}
                  {activity.details.comment && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {activity.details.comment}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {!showAll && activities.length > maxItems && (
        <div className="text-center pt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hiển thị {maxItems} / {activities.length} hoạt động
          </p>
        </div>
      )}
    </div>
  );
}
