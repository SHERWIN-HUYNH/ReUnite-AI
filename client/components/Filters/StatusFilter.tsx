import React from 'react';

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="status-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Trạng thái:
      </label>
      <select
        id="status-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-sm"
      >
        <option value="">Tất cả</option>
        <option value="pending">Chờ duyệt</option>
        <option value="finding">Đang tìm</option>
        <option value="found">Đã tìm thấy</option>
        <option value="disable">Vô hiệu</option>
      </select>
    </div>
  );
}