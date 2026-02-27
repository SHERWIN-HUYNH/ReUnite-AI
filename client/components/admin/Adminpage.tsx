'use client'
import { StatCard } from '@/components/StatCard'
import React, { useEffect, useState } from 'react'
import Loading from '../common/Loading'
import { toast } from 'sonner'
import { 
  FileText, 
  TrendingUp, 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle,
  ArrowRight,
  AlertCircle
} from 'lucide-react'
import { mockMissingPosts, mockStatistics } from '@/data/mockAdminData'
import { getRecentActivities } from '@/data/mockActivityLogs'
import ActivityTimeline from '../ActivityTimeline'
import Link from 'next/link'

const AdminPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const recentActivities = getRecentActivities(5);

  const quickStats = [
    {
      label: 'Chờ duyệt',
      value: mockStatistics.pendingPosts,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      link: '/admin/post?filter=pending'
    },
    {
      label: 'Đang tìm',
      value: mockStatistics.findingPosts,
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      link: '/admin/post?filter=finding'
    },
    {
      label: 'Đã tìm thấy',
      value: mockStatistics.foundPosts,
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/30',
      link: '/admin/post?filter=found'
    },
    {
      label: 'Tỷ lệ thành công',
      value: `${mockStatistics.successRate}%`,
      color: 'text-indigo-600',
      bg: 'bg-indigo-100 dark:bg-indigo-900/30',
      link: '/admin/chart'
    }
  ];
 
  return (
    <>
    {isLoading && <Loading />}
    <div className="mx-auto flex max-w-7xl flex-col space-y-8 p-4 md:p-6 2xl:p-10">
      {/* Modern Header */}
      <header className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-white/80 text-lg">
              Quản lý hệ thống và theo dõi hoạt động
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
            <Calendar className="w-5 h-5 text-white" />
            <span className="text-white font-medium">
              {new Date().toLocaleDateString('vi-VN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </header>

      <main className="space-y-8">
        {/* Welcome Section */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Chào mừng 👋
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Bắt đầu ngày mới với việc quản lý bài đăng và người dùng
          </p>
        </section>

        {/* Stats Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            type="appointments"
            count={mockStatistics.activeAccounts}
            label="Tài khoản hoạt động"
            icon={'/assets/icons/appointments.svg'}
          />
          <StatCard
            type="pending"
            count={mockStatistics.totalPosts}
            label="Tổng bài đăng"
            icon={'/assets/icons/pending.svg'}
          />
          <StatCard
            type="cancelled"
            count={mockStatistics.foundPosts}
            label="Đã tìm thấy"
            icon={'/assets/icons/cancelled.svg'}
          />
          <StatCard
            type="appointments"
            count={mockStatistics.totalSearches}
            label="Lượt tìm kiếm"
            icon={'/assets/icons/appointments.svg'}
          />
        </section>

        {/* Quick Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, idx) => (
            <Link
              key={idx}
              href={stat.link}
              className="group bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 p-6 hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <span className={`text-2xl font-bold ${stat.color}`}>
                    {typeof stat.value === 'number' ? stat.value : stat.value}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </Link>
          ))}
        </section>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Truy cập nhanh
              </h3>
            </div>

            <div className="space-y-3">
              <Link
                href="/admin/post"
                className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Quản lý bài đăng</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {mockStatistics.pendingPosts} bài chờ duyệt
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
              </Link>

              <Link
                href="/admin/account"
                className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Quản lý tài khoản</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {mockStatistics.activeAccounts} tài khoản
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
              </Link>

              <Link
                href="/admin/chart"
                className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Báo cáo & Biểu đồ</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Thống kê và phân tích
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
              </Link>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Hoạt động gần đây
                </h3>
              </div>
              <Link 
                href="/admin/activity"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
              >
                Xem tất cả
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <ActivityTimeline activities={recentActivities} maxItems={5} />
          </section>
        </div>
      </main>
    </div>
    </>
  )
}

export default AdminPage
