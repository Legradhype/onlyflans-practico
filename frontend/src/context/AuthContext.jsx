import { createContext, useCallback, useEffect, useState } from 'react'
import { authApi } from '../api/auth.api'

export const AuthContext = createContext(null)

const TOKEN_KEY = 'of_token'
const USER_KEY = 'of_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(false)

  const persist = useCallback((newToken, newUser) => {
    localStorage.setItem(TOKEN_KEY, newToken)
    localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    setToken(newToken)
    setUser(newUser)
  }, [])

  const clear = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }, [])

  const register = useCallback(async (data) => {
    setLoading(true)
    try {
      const res = await authApi.register(data)
      const { token: t, user: u } = res.data.data
      persist(t, u)
      return u
    } finally {
      setLoading(false)
    }
  }, [persist])

  const login = useCallback(async (data) => {
    setLoading(true)
    try {
      const res = await authApi.login(data)
      const { token: t, user: u } = res.data.data
      persist(t, u)
      return u
    } finally {
      setLoading(false)
    }
  }, [persist])

  const logout = useCallback(async () => {
    try { await authApi.logout() } catch {}
    clear()
  }, [clear])

  const isAuthenticated = !!token && !!user
  const isCreator = user?.role === 'CREATOR'
  const isFollower = user?.role === 'FOLLOWER'

  return (
    <AuthContext.Provider
      value={{ user, token, loading, isAuthenticated, isCreator, isFollower, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
