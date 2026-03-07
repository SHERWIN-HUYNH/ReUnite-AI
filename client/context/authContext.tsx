'use client'
import { createContext, useContext, useEffect, useState } from 'react'

type User = { account_id: string;name: string; email: string; role: string; phone: string }
type AuthContextType = {
  user: User | null
  setUser: (u: User | null) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('access_token')
        if (!token) {
          setLoading(false)
          return
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { 
          cache: 'no-store',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        
        if (res.ok) {
          const data = await res.json()
          // Map server response to client user format
          const mappedUser = {
            account_id: data.id,
            name: data.username,
            email: data.email,
            role: data.role,
            phone: data.phone,
          }
          setUser(mappedUser)
        } else {
          // Token invalid, clear it
          localStorage.removeItem('access_token')
        }
      } catch (error) {
        console.error('Error loading user:', error)
        localStorage.removeItem('access_token')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)