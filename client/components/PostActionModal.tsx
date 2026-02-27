'use client';

import { useState } from 'react';
import { X, CheckCircle, XCircle, Ban, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

type ActionType = 'approve' | 'reject' | 'disable' | 'delete';

interface PostActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: ActionType;
  postName: string;
  postId: string;
  onConfirm: (reason?: string) => void;
}

const actionConfig = {
  approve: {
    title: 'Duyệt bài đăng',
    description: 'Bài đăng sẽ được chuyển sang trạng thái "Đang tìm" và hiển thị công khai.',
    icon: CheckCircle,
    iconColor: 'text-green-600',
    buttonColor: 'bg-green-600 hover:bg-green-700',
    requireReason: false
  },
  reject: {
    title: 'Từ chối bài đăng',
    description: 'Bài đăng sẽ bị từ chối và không được hiển thị. Vui lòng cung cấp lý do.',
    icon: XCircle,
    iconColor: 'text-red-600',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    requireReason: true
  },
  disable: {
    title: 'Vô hiệu hóa bài đăng',
    description: 'Bài đăng sẽ bị vô hiệu hóa và ẩn khỏi danh sách công khai. Vui lòng cung cấp lý do.',
    icon: Ban,
    iconColor: 'text-orange-600',
    buttonColor: 'bg-orange-600 hover:bg-orange-700',
    requireReason: true
  },
  delete: {
    title: 'Xóa bài đăng',
    description: 'Hành động này không thể hoàn tác. Tất cả dữ liệu liên quan sẽ bị xóa vĩnh viễn.',
    icon: AlertTriangle,
    iconColor: 'text-red-600',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    requireReason: true
  }
};

export default function PostActionModal({
  isOpen,
  onClose,
  actionType,
  postName,
  postId,
  onConfirm
}: PostActionModalProps) {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const config = actionConfig[actionType];
  const Icon = config.icon;

  const handleConfirm = async () => {
    if (config.requireReason && !reason.trim()) {
      toast.error('Vui lòng nhập lý do');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onConfirm(reason);
      toast.success(`${config.title} thành công`);
      onClose();
      setReason('');
    } catch (_error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-gray-100 dark:bg-slate-700 ${config.iconColor}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {config.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                ID: {postId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Bài đăng:
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {postName}
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              {config.description}
            </p>
          </div>

          {config.requireReason && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lý do {actionType === 'delete' ? '(bắt buộc)' : ''}
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={`Nhập lý do ${actionType === 'reject' ? 'từ chối' : actionType === 'disable' ? 'vô hiệu hóa' : 'xóa'} bài đăng...`}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Lý do này sẽ được gửi cho người đăng bài và lưu vào lịch sử.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-slate-700">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting || (config.requireReason && !reason.trim())}
            className={`flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${config.buttonColor}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Đang xử lý...
              </span>
            ) : (
              'Xác nhận'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
