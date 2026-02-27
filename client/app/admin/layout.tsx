import AdminLayout from '@/components/Layouts/adminLayout'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>
}
