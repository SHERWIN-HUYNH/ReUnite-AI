'use client';

import { useMemo, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  SortingState,
  getPaginationRowModel,
} from '@tanstack/react-table';
import SearchFilter from './Filters/SearchFilter';
import GenderFilter from './Filters/GenderFilter';
import DateRangeFilter from './Filters/DateRangeFilter';
import ImageFilter from './Filters/ImageFilter';
import StatusFilter from './Filters/StatusFilter';
import Table from './AdminTable/Table';
import ActionButtons from './ActionButtons';
import PageHeader from './PageHeader';
import { format } from 'date-fns';
import Pagination from './Pagination';
import { mockMissingPosts } from '@/data/mockAdminData';

type MissingPerson = {
  id: string;
  name: string;
  gender: string;
  missingDate: string;
  location: string;
  image: string | null;
  description: string;
  status: string;
  authorName: string;
};

// Transform mock data to match table format
const data: MissingPerson[] = mockMissingPosts.map(post => ({
  id: post.post_id,
  name: post.name,
  gender: post.gender === 'male' ? 'Nam' : post.gender === 'female' ? 'Nữ' : 'Khác',
  missingDate: post.missing_since,
  location: post.address,
  image: post.images.length > 0 ? post.images.find(img => img.is_avatar)?.url || post.images[0].url : null,
  description: post.description,
  status: post.status,
  authorName: post.author_name
}));

export default function MissingPersonsTable() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hasImage, setHasImage] = useState(false);
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredData = useMemo(() => {
    return data.filter((person) => {
      let matches = true;

      if (genderFilter && person.gender !== genderFilter) matches = false;
      if (statusFilter && person.status !== statusFilter) matches = false;
      if (hasImage && !person.image) matches = false;
      const missingDate = new Date(person.missingDate);
      if (startDate && missingDate < startDate) matches = false;
      if (endDate && missingDate > endDate) matches = false;

      return matches;
    });
  }, [startDate, endDate, hasImage, genderFilter, statusFilter]);

  const columns = useMemo<ColumnDef<MissingPerson>[]>(
    () => [
      { accessorKey: 'id', header: 'STT', cell: ({ row }) => row.index + 1 },
      { accessorKey: 'name', header: 'Tên người mất tích' },
      { accessorKey: 'authorName', header: 'Người đăng' },
      { accessorKey: 'gender', header: 'Giới tính' },
      {
        accessorKey: 'missingDate',
        header: 'Thời gian mất tích',
        cell: ({ row }) => format(new Date(row.original.missingDate), 'dd/MM/yyyy HH:mm'),
      },
      { 
        accessorKey: 'location', 
        header: 'Địa chỉ',
        cell: ({ row }) => (
          <div className="max-w-xs truncate" title={row.original.location}>
            {row.original.location}
          </div>
        )
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái',
        cell: ({ row }) => {
          const statusMap: Record<string, { label: string; className: string }> = {
            pending: { label: 'Chờ duyệt', className: 'bg-yellow-100 text-yellow-800' },
            finding: { label: 'Đang tìm', className: 'bg-blue-100 text-blue-800' },
            found: { label: 'Đã tìm thấy', className: 'bg-green-100 text-green-800' },
            disable: { label: 'Vô hiệu', className: 'bg-gray-100 text-gray-800' },
          };
          const status = statusMap[row.original.status] || { label: row.original.status, className: 'bg-gray-100 text-gray-800' };
          return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.className}`}>
              {status.label}
            </span>
          );
        },
      },
      {
        accessorKey: 'image',
        header: 'Hình ảnh',
        cell: ({ row }) =>
          row.original.image ? (
            <img src={row.original.image} alt="Person" className="w-12 h-12 rounded-full object-cover" />
          ) : (
            <span className="text-gray-400 text-sm">Không có</span>
          ),
      },
      { 
        accessorKey: 'description', 
        header: 'Mô tả',
        cell: ({ row }) => (
          <div className="max-w-xs truncate" title={row.original.description}>
            {row.original.description}
          </div>
        )
      },
      { 
        id: 'actions', 
        header: 'Thao tác', 
        cell: ({ row }) => (
          <ActionButtons 
            postId={row.original.id}
            postName={row.original.name}
            status={row.original.status}
            onStatusChange={(newStatus) => {
              console.log(`Change status of ${row.original.id} to ${newStatus}`);
              // TODO: Implement actual status change API call
            }}
          />
        )
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { globalFilter, columnFilters, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Thêm phân trang
    initialState: {
      pagination: {
        pageSize: 5, // Số mục trên mỗi trang
      },
    },
  });

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <PageHeader title="Quản lý bài đăng người mất tích" />
        <div className="flex flex-wrap gap-4 mb-4">
          <SearchFilter value={globalFilter} onChange={setGlobalFilter} />
          <GenderFilter value={genderFilter} onChange={setGenderFilter} />
          <StatusFilter value={statusFilter} onChange={setStatusFilter} />
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
          <ImageFilter value={hasImage} onChange={setHasImage} />
          <div className="ml-auto text-gray-600 dark:text-gray-400">Hiện có {filteredData.length} dữ liệu bài đăng.</div>
        </div>
        <div className="overflow-x-auto">
          <Table table={table} />
        </div>
        <Pagination
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
          onPageChange={(page) => table.setPageIndex(page - 1)}
        />
      </div>
    </div>
  );
}