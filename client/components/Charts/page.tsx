'use client'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import ChartOne from '@/components/Charts/ChartOne'
import ChartTwo from '@/components/Charts/ChartTwo'
import { AppointmentReport, fetchAppointmentData } from '@/helper/chart'
import dynamic from 'next/dynamic'
import * as XLSX from 'xlsx'
import { REPORT_NOT_FOUND } from '@/validation/messageCode/apiMessageCode/chart'

interface AppointmentData {
  year: number
  month: number
  totalAppointments: number
  totalAmount: number
  appointments: {
    id: string;
    date: string;
    price: number;
    serviceName: string;
    facultyName: string;
  }[];  
}

const ChartThree = dynamic(() => import('@/components/Charts/ChartThree'), {
  ssr: false,
})

const Chart: React.FC = () => {
  const [statistics, setStatistics] = useState<AppointmentReport[]>([])
  const [appointmentsData, setAppointmentsData] = useState<AppointmentData[]>([])
  const [selectedYear, setSelectedYear] = useState<number | 'all'>(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>(new Date().getMonth() + 1)

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAppointmentData()
      if (data.length === 0) {
        console.warn(REPORT_NOT_FOUND)
      }
      setStatistics(data)
    }

    loadData()
  }, [])

  useEffect(() => {
    const fetchAppointmentsData = async () => {
      try {
        const response = await fetch(`/api/chart/chart2`)
        const data = await response.json()
        setAppointmentsData(data)
      } catch (error) {
        console.error('Error fetching appointment data:', error)
      }
    }

    fetchAppointmentsData()
  }, [])

  const handleExportReport = () => {
    const filteredData = appointmentsData.filter(
      (data) =>
        (selectedYear === 'all' || data.year === selectedYear) &&
        (selectedMonth === 'all' || data.month === selectedMonth)
    )

    const groupedData = filteredData.reduce(
      (acc, curr) => {
        const yearKey = `${curr.year}`

        if (!acc[yearKey]) {
          acc[yearKey] = {
            year: curr.year,
            totalAppointments: 0,
            totalAmount: 0,
            months: {},
          }
        }

        acc[yearKey].totalAppointments += curr.totalAppointments
        acc[yearKey].totalAmount += curr.totalAmount
        const monthKey = curr.month

        if (!acc[yearKey].months[monthKey]) {
          acc[yearKey].months[monthKey] = {
            totalAppointments: 0,
            totalAmount: 0,
            faculties: {},
          }
        }

        acc[yearKey].months[monthKey].totalAppointments += curr.totalAppointments
        acc[yearKey].months[monthKey].totalAmount += curr.totalAmount

        curr.appointments.forEach((appointment) => {
          const facultyName = appointment.facultyName || 'Không xác định'
          const serviceName = appointment.serviceName || 'Không xác định'

          if (!acc[yearKey].months[monthKey].faculties[facultyName]) {
            acc[yearKey].months[monthKey].faculties[facultyName] = {}
          }

          if (!acc[yearKey].months[monthKey].faculties[facultyName][serviceName]) {
            acc[yearKey].months[monthKey].faculties[facultyName][serviceName] = {
              totalAppointments: 0,
              totalAmount: 0,
            }
          }

          acc[yearKey].months[monthKey].faculties[facultyName][
            serviceName
          ].totalAppointments += 1
          acc[yearKey].months[monthKey].faculties[facultyName][serviceName].totalAmount +=
            appointment.price || 0
        })

        return acc
      },
      {} as Record<
        string,
        {
          year: number
          totalAppointments: number
          totalAmount: number
          months: Record<
            number,
            {
              totalAppointments: number
              totalAmount: number
              faculties: Record<
                string,
                Record<
                  string,
                  {
                    totalAppointments: number
                    totalAmount: number
                  }
                >
              >
            }
          >
        }
      >
    );

    let reportData: any[] = [];
    Object.values(groupedData).forEach((group) => {
      const { year, months } = group
      reportData.push({
        Nam: year,
        Thang: '',
        ChuyenKhoa: '',
        DichVu: '',
        SoCuocHen: group.totalAppointments,
        DoanhThu: group.totalAmount.toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }),
      });

      Object.entries(months).forEach(([month, monthData]) => {
        reportData.push({
          Nam: '',
          Thang: month,
          ChuyenKhoa: '',
          DichVu: '',
          SoCuocHen: monthData.totalAppointments,
          DoanhThu: monthData.totalAmount.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }),
        })
        Object.entries(monthData.faculties).forEach(([facultyName, services]) => {
          Object.entries(services).forEach(([serviceName, stats]) => {
            reportData.push({
              Nam: '',
              Thang: '',
              ChuyenKhoa: facultyName,
              DichVu: serviceName,
              SoCuocHen: stats.totalAppointments,
              DoanhThu: stats.totalAmount.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }),
            });
          });
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Báo Cáo");
    XLSX.writeFile(workbook, "bao_cao.xlsx");
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Modern Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Báo cáo & Thống kê
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Theo dõi hoạt động tìm kiếm và báo cáo người mất tích
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            <option value="all">Tất cả các năm</option>
            {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map((year) => (
              <option key={year} value={year}>
                Năm {year}
              </option>
            ))}
          </select>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          >
            <option value="all">Tất cả các tháng</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
              <option key={month} value={month}>
                Tháng {month < 10 ? `0${month}` : month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <div className="h-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
            <ChartOne />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="h-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
            <ChartThree />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chart
