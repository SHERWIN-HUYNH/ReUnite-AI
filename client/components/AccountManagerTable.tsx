'use client';

import { useMemo, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table';
import SearchFilter from './Filters/SearchFilter';
import DateRangeFilter from './Filters/DateRangeFilter';
import StatusFilter from './Filters/StatusFilter';
import Table from './AdminTable/Table';
import AccountActions from './AccountActions';
import PageHeader from './PageHeader';
import Pagination from './Pagination';
import { format } from 'date-fns';
import { Account } from '@/types/interface';
import mockDetailedAccounts from '@/data/mockAccountData';

// Use mock data
const data: Account[] = mockDetailedAccounts;

export default function AccountManagerTable() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState('');

  const filteredData = useMemo(() => {
    return data.filter((account) => {
      let matches = true;

      if (statusFilter && account.status !== statusFilter) matches = false;
      const createdDate = new Date(account.createdDate);
      if (startDate && createdDate < startDate) matches = false;
      if (endDate && createdDate > endDate) matches = false;

      return matches;
    });
  }, [startDate, endDate, statusFilter]);

  const columns = useMemo<ColumnDef<Account>[]>(
    () => [
      { accessorKey: 'id', header: 'STT', cell: ({ row }) => row.index + 1 },
      { accessorKey: 'ownerName', header: 'Tên chủ tài khoản' },
      { accessorKey: 'postsCreated', header: 'Bài đăng', cell: ({ row }) => (
        <span className="font-medium text-blue-600">{row.original.postsCreated}</span>
      )},
      { accessorKey: 'postsFound', header: 'Tìm thấy', cell: ({ row }) => (
        <span className="font-medium text-green-600">{row.original.postsFound}</span>
      )},
      {
        accessorKey: 'createdDate',
        header: 'Ngày tạo',
        cell: ({ row }) => format(new Date(row.original.createdDate), 'dd/MM/yyyy'),
      },
      {
        accessorKey: 'lastLogin',
        header: 'Đăng nhập cuối',
        cell: ({ row }) => row.original.lastLogin 
          ? format(new Date(row.original.lastLogin), 'dd/MM/yyyy')
          : 'Chưa đăng nhập'
      },
      { 
        accessorKey: 'status', 
        header: 'Trạng thái',
        cell: ({ row }) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {row.original.status === 'Active' ? 'Hoạt động' : 'Vô hiệu'}
          </span>
        )
      },
      {
        id: 'actions',
        header: 'Thao tác',
        cell: ({ row }) => <AccountActions isDisabled={row.original.status === 'Disabled'} />,
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
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5, // Số mục trên mỗi trang
      },
    },
    globalFilterFn: 'includesString',
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <PageHeader title="Quản lý tài khoản" />
        <div className="flex flex-wrap gap-4 mb-4">
          <SearchFilter value={globalFilter} onChange={setGlobalFilter} />
          <StatusFilter value={statusFilter} onChange={setStatusFilter} />
          <DateRangeFilter
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
          <div className="ml-auto text-gray-600">Hiện có {filteredData.length} tài khoản.</div>
        </div>
        <Table table={table} />
        <Pagination
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
          onPageChange={(page) => table.setPageIndex(page - 1)}
        />
      </div>
    </div>
  );
}