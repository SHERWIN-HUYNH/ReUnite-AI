'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { LoginSchema } from '@/validation/login'
import 'react-phone-number-input/style.css'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { PasswordInput } from '../PasswordInput'
import { Label } from '../ui/label'
import React from 'react'
import { toast } from 'sonner'
import { useAuth } from '@/context/authContext'
import { Mail, Lock } from 'lucide-react'

export const LoginForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useAuth()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setIsLoading(true)
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })

      const contentType = res.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        toast.error('Server không phản hồi đúng định dạng. Vui lòng kiểm tra server.')
        throw new Error('Server returned non-JSON response')
      }

      const responseData = await res.json()
      if (!res.ok) {
        toast.error(responseData.detail || 'Đăng nhập thất bại')
        throw new Error(responseData.detail)
      }

      // Lưu access token vào localStorage
      if (responseData.access_token) {
        localStorage.setItem('access_token', responseData.access_token)
      }

      // Map server user response sang định dạng client
      const mappedUser = {
        account_id: responseData.user.id,
        name: responseData.user.username,
        email: responseData.user.email,
        role: responseData.user.role,
        phone: responseData.user.phone,
      }

      setUser(mappedUser)
      toast.success('Đăng nhập thành công! 🎉')

      // Redirect theo role — dùng replace để không để lại /login trong history
      const target = mappedUser.role === 'admin' ? '/admin' : '/'
      setTimeout(() => {
        router.replace(target)
        router.refresh()
      }, 500)
    } catch (error: unknown) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <div className="p-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-md">
              <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            </div>
            Email
          </Label>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label=""
            placeholder="your.email@example.com"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <div className="p-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-md">
              <Lock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            </div>
            Mật khẩu
          </Label>
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <div>
                <PasswordInput
                  id="password"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  autoComplete="current-password"
                  placeholder="Nhập mật khẩu của bạn"
                />
                {fieldState.error && (
                  <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
          >
            Quên mật khẩu?
          </button>
        </div>

        {/* Submit Button */}
        <SubmitButton isLoading={isLoading}>
          Đăng nhập
        </SubmitButton>
      </form>
    </Form>
  )
}
