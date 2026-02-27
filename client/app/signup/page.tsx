import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { RegisterForm } from '@/components/forms/RegisterForm'
import { UserPlus, Shield, Zap, Users } from 'lucide-react'

const SignUp = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
          <div className="max-w-lg space-y-8">
            {/* Image */}
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/familyReunion.png"
                fill
                alt="Family Reunion"
                className="object-cover"
              />
            </div>

            {/* Features */}
            <div className="space-y-6 text-center">
              <h3 className="text-3xl font-bold">
                Tham gia cộng đồng ReUnite
              </h3>
              <p className="text-lg text-white/90">
                Đăng ký để sử dụng công nghệ AI tiên tiến trong việc tìm kiếm người thân
              </p>

              {/* Feature List */}
              <div className="grid grid-cols-1 gap-4 text-left">
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Tìm kiếm nhanh chóng</h4>
                    <p className="text-sm text-white/80">AI nhận diện khuôn mặt trong vài giây</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">An toàn & Bảo mật</h4>
                    <p className="text-sm text-white/80">Thông tin được mã hóa và bảo vệ tuyệt đối</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="p-2 bg-white/20 rounded-lg flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Cộng đồng hỗ trợ</h4>
                    <p className="text-sm text-white/80">Hàng nghìn người dùng tin tưởng và sử dụng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4 shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ReUnite Face
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Tạo tài khoản mới
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 p-8 sm:p-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Đăng ký tài khoản
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Điền thông tin để bắt đầu
              </p>
            </div>

            <RegisterForm />

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-slate-800 text-gray-500">
                  hoặc
                </span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Đã có tài khoản?{' '}
                <Link 
                  href="/login" 
                  className="font-semibold text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Bằng việc đăng ký, bạn đồng ý với{' '}
              <Link href="/terms" className="text-purple-600 hover:text-purple-500 dark:text-purple-400 transition-colors">
                Điều khoản sử dụng
              </Link>
              {' '}và{' '}
              <Link href="/privacy" className="text-purple-600 hover:text-purple-500 dark:text-purple-400 transition-colors">
                Chính sách bảo mật
              </Link>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2026 ReUnite Face. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignUp
