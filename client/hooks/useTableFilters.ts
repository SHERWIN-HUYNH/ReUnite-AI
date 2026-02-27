import { useState } from 'react'
import { ColumnFiltersState, SortingState } from '@tanstack/react-table'

/**
 * Shared hook for table filter state management
 * Used across AccountManagerTable and MissingPersonsTable
 */
export function useTableFilters() {
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const resetFilters = () => {
    setGlobalFilter('')
    setColumnFilters([])
    setSorting([])
    setStartDate(null)
    setEndDate(null)
  }

  return {
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
    sorting,
    setSorting,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    resetFilters,
  }
}
