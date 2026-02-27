'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import 'react-phone-number-input/style.css'
import CustomFormField, { FormFieldType } from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { toast } from 'sonner'
import { Label } from '../ui/label'
import { PasswordInput } from '../PasswordInput'
import React from 'react'
import { RegisterUser2 } from '@/validation/register'
import { Mail, Lock, User, Phone } from 'lucide-react'

export const RegisterForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const form = useForm<z.infer<typeof RegisterUser2>>({
    resolver: zodResolver(RegisterUser2),
    defaultValues: {
      username: '',
      email: '',
      phone: '',
    },
  })
  const onSubmit = async (values: z.infer<typeof RegisterUser2>) => {
    setIsLoading(true)
    try {
      if (!currentPassword) {
        toast.error('Vui lòng nhập mật khẩu')
        return
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: currentPassword,
          name: values.username,
          phone: values.phone,
        }),
      })
      const responseData = await res.json()

      if (!res.ok) {
        toast.error(responseData.error || 'Đăng ký thất bại')
        throw new Error(responseData.error)
      }
      
      toast.success('Đăng ký thành công! 🎉')
      setTimeout(() => {
        router.push('/login')
      }, 500)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Registration error:', error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Username Field */}
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded-md">
              <User className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            Họ và tên
          </Label>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="username"
            label=""
            placeholder="Nguyễn Văn A"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded-md">
              <Mail className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            Email
          </Label>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label=""
            placeholder="your.email@example.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded-md">
              <Phone className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            Số điện thoại
          </Label>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="phone"
            label=""
            placeholder="0912 345 678"
            type="tel"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded-md">
              <Lock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            Mật khẩu
          </Label>
          <PasswordInput
            id="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="new-password"
            placeholder="Tạo mật khẩu mạnh"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Mật khẩu phải có ít nhất 8 ký tự
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <SubmitButton isLoading={isLoading}>
            Tạo tài khoản
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}
