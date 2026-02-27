'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Eye, Edit, Trash2, CheckCircle, XCircle, Ban, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import PostActionModal from './PostActionModal';

interface ActionButtonsProps {
  postId?: string;
  postName?: string;
  status?: string;
  onStatusChange?: (newStatus: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ActionButtons({
  postId = '',
  postName = '',
  status = 'pending',
  onStatusChange,
  onEdit,
  onDelete
}: ActionButtonsProps) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'approve' | 'reject' | 'disable' | 'delete' | null;
  }>({
    isOpen: false,
    type: null
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const handleViewDetails = () => {
    if (postId) {
      router.push(`/admin/post/${postId}`);
    }
    setIsDropdownOpen(false);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    } else if (postId) {
      router.push(`/admin/post/${postId}/edit`);
    }
    setIsDropdownOpen(false);
  };

  const openModal = (type: 'approve' | 'reject' | 'disable' | 'delete') => {
    setModalState({ isOpen: true, type });
    setIsDropdownOpen(false);
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const handleConfirm = (reason?: string) => {
    if (onStatusChange && modalState.type) {
      switch (modalState.type) {
        case 'approve':
          onStatusChange('finding');
          break;
        case 'reject':
        case 'disable':
          onStatusChange('disable');
          break;
        case 'delete':
          if (onDelete) onDelete();
          break;
      }
    }
    console.log(`Action: ${modalState.type}, Reason: ${reason}`);
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Compact Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Quick View */}
          <button
            onClick={handleViewDetails}
            className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 transition-all"
            title="Xem chi tiết"
          >
            <Eye className="h-4 w-4" />
          </button>

          {/* Dropdown Menu */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-all"
            title="Thêm hành động"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 py-1">
            {status === 'pending' && (
              <>
                <button
                  onClick={() => openModal('approve')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Duyệt bài
                </button>
                <button
                  onClick={() => openModal('reject')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-2"
                >
                  <XCircle className="h-4 w-4" />
                  Từ chối
                </button>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
              </>
            )}
            
            <button
              onClick={handleEdit}
              className="w-full px-4 py-2 text-left text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Chỉnh sửa
            </button>

            {status !== 'disable' && (
              <button
                onClick={() => openModal('disable')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center gap-2"
              >
                <Ban className="h-4 w-4" />
                Vô hiệu hóa
              </button>
            )}

            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            
            <button
              onClick={() => openModal('delete')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Xóa vĩnh viễn
            </button>
          </div>
        )}
      </div>

      {/* Action Modal */}
      {modalState.type && (
        <PostActionModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          actionType={modalState.type}
          postName={postName}
          postId={postId}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
            </button>
            <button
              onClick={() => openModal('reject')}
              className="group relative p-2 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 transition-all hover:scale-110"
              title="Từ chối"
            >
              <XCircle className="h-4 w-4" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Từ chối
              </span>
            </button>
          </>
        )}

        {/* Edit */}
        <button
          onClick={handleEdit}
          className="group relative p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 transition-all hover:scale-110"
          title="Chỉnh sửa"
        >
          <Edit className="h-4 w-4" />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chỉnh sửa
          </span>
        </button>

        {/* Disable (for active posts) */}
        {status !== 'disable' && (
          <button
            onClick={() => openModal('disable')}
            className="group relative p-2 rounded-lg bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:hover:bg-orange-900/40 text-orange-600 dark:text-orange-400 transition-all hover:scale-110"
            title="Vô hiệu hóa"
          >
            <Ban className="h-4 w-4" />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Vô hiệu hóa
            </span>
          </button>
        )}

        {/* Delete */}
        <button
          onClick={() => openModal('delete')}
          className="group relative p-2 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 transition-all hover:scale-110"
          title="Xóa"
        >
          <Trash2 className="h-4 w-4" />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Xóa vĩnh viễn
          </span>
        </button>
      </div>

      {/* Action Modal */}
      {modalState.type && (
        <PostActionModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          actionType={modalState.type}
          postName={postName}
          postId={postId}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}