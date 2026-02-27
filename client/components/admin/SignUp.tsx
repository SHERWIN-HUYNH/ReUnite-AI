'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { PasswordInput } from '../PasswordInput'
import { toast } from 'sonner'
import { RegisterSchema } from '@/validation/register'
import SubmitButton from '../SubmitButton'
import { useRouter } from 'next/navigation'

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      phone: '',
    },
  })
  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      
      const responseData = await res.json()

      if (!res.ok) {
        toast.error(responseData.error || 'Đăng ký thất bại')
        throw new Error(responseData.error)
      }
      
      toast.success('Tạo tài khoản thành công!')
      form.reset()
      router.push('/admin/account')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-slate-700/50">
        <div className="flex flex-col lg:flex-row">
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-12 items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjE1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
            
            <div className="relative z-10 text-center text-white">
              <Link href="/" className="inline-block mb-8">
                <Image
                  src={'/assets/images/logo.png'}
                  alt="Logo"
                  width={176}
                  height={32}
                  className="brightness-0 invert"
                />
              </Link>
              
              <h3 className="text-3xl font-bold mb-4">
                Hệ thống quản lý tài khoản
              </h3>
              <p className="text-white/80 text-lg max-w-md mx-auto mb-12">
                Trang đăng ký tài khoản cho phép quản trị viên tạo tài khoản mới cho người dùng trên hệ thống ReUnite AI
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-left bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Quản lý tài khoản</p>
                    <p className="text-sm text-white/70">Tạo và quản lý người dùng hiệu quả</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-left bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Phân quyền linh hoạt</p>
                    <p className="text-sm text-white/70">User hoặc Admin</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-left bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold">Bảo mật cao</p>
                    <p className="text-sm text-white/70">Xác thực và mã hóa dữ liệu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-8 sm:p-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Tạo tài khoản mới
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Điền thông tin để tạo tài khoản cho người dùng
              </p>
              
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Họ và tên
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nguyễn Văn A"
                            {...field}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 dark:focus:border-purple-500 focus:ring-1 focus:ring-indigo-500/20 dark:focus:ring-purple-500/20 transition-all outline-none"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@gmail.com"
                            {...field}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 dark:focus:border-purple-500 focus:ring-1 focus:ring-indigo-500/20 dark:focus:ring-purple-500/20 transition-all outline-none"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Số điện thoại
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="0123456789"
                            {...field}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 dark:focus:border-purple-500 focus:ring-1 focus:ring-indigo-500/20 dark:focus:ring-purple-500/20 transition-all outline-none"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Mật khẩu
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="••••••••"
                            {...field}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 dark:focus:border-purple-500 focus:ring-1 focus:ring-indigo-500/20 dark:focus:ring-purple-500/20 transition-all outline-none"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Xác nhận mật khẩu
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="••••••••"
                            {...field}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 dark:focus:border-purple-500 focus:ring-1 focus:ring-indigo-500/20 dark:focus:ring-purple-500/20 transition-all outline-none"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Loại tài khoản
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="grid grid-cols-2 gap-3"
                          >
                            <FormItem className="relative">
                              <FormControl>
                                <RadioGroupItem value="user" id="user" className="peer sr-only" />
                              </FormControl>
                              <FormLabel 
                                htmlFor="user" 
                                className="flex items-center justify-center gap-2 p-3.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 cursor-pointer transition-all peer-data-[state=checked]:border-indigo-500 peer-data-[state=checked]:bg-indigo-50 dark:peer-data-[state=checked]:bg-indigo-950/50 dark:peer-data-[state=checked]:border-purple-500 hover:border-indigo-400 dark:hover:border-purple-600"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                                </svg>
                                <span className="font-semibold">Người dùng</span>
                              </FormLabel>
                            </FormItem>
                            
                            <FormItem className="relative">
                              <FormControl>
                                <RadioGroupItem value="admin" id="admin" className="peer sr-only" />
                              </FormControl>
                              <FormLabel 
                                htmlFor="admin" 
                                className="flex items-center justify-center gap-2 p-3.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800/50 cursor-pointer transition-all peer-data-[state=checked]:border-indigo-500 peer-data-[state=checked]:bg-indigo-50 dark:peer-data-[state=checked]:bg-indigo-950/50 dark:peer-data-[state=checked]:border-purple-500 hover:border-indigo-400 dark:hover:border-purple-600"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                                </svg>
                                <span className="font-semibold">Quản trị viên</span>
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <SubmitButton 
                      isLoading={isLoading}
                      className="w-full py-2.5 px-6 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg shadow-indigo-500/30 dark:shadow-purple-900/30 transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
                    </SubmitButton>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
