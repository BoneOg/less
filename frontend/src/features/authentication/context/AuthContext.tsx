import { createContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '../services/authService'

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'staff' | 'user';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = async () => {
    try {
      const userData = await authService.getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access')
      if (token) {
        try {
          const userData = await authService.getCurrentUser()
          setUser(userData)
        } catch (error) {
          console.error('Failed to fetch user:', error)
          localStorage.removeItem('access')
          localStorage.removeItem('refresh')
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (credentials: any) => {
    const data = await authService.login(credentials)
    localStorage.setItem('access', data.access)
    localStorage.setItem('refresh', data.refresh)

    const userData = await authService.getCurrentUser()
    setUser(userData)
  }

  const register = async (userData: any) => {
    await authService.register(userData)
  }

  const logout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}
