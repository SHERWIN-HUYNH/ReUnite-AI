'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import {LoginSchema } from '@/validation/login'
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
  const [currentPassword, setCurrentPassword] = useState('')
  const {user,setUser} = useAuth()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: ''
    },
  })
  useEffect(() => {
  console.log('Form Errors:', form.formState.errors)
}, [form.formState.errors])
  
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    console.log(form.formState.errors)
    console.log('IS LOADING', isLoading)
    setIsLoading(true)
    try {
      if (!currentPassword) {
        toast.error('Vui lòng nhập mật khẩu')
        return
      }
      const res = await fetch(`api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: values.email,
          password: currentPassword,
        }),
      })
      const responseData = await res.json()
      if (!res.ok) {
        toast.error(responseData.error || 'Đăng nhập thất bại')
        throw new Error(responseData.error)
      }
      setUser(responseData.user)
      toast.success('Đăng nhập thành công! 🎉')
      console.log('LOGIN',user?.role)
      
      // Redirect based on role
      setTimeout(() => {
        if(responseData.user?.role === 'admin'){
          router.push('/admin')
        } else{
          router.push('/')
        }
      }, 500)

    } catch (error: any) {
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
          <Label htmlFor="current_password" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <div className="p-1 bg-indigo-100 dark:bg-indigo-900/30 rounded-md">
              <Lock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            </div>
            Mật khẩu
          </Label>
          <PasswordInput
            id="current_password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Nhập mật khẩu của bạn"
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
