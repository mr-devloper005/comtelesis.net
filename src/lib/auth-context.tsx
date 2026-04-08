'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { User } from '@/types'
import { currentUser } from '@/data/mock-data'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'

type LocalAuthAccounts = Record<string, { password: string; name?: string }>

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (name: string, email: string, password: string) => Promise<void>
  updateUser: (updates: Partial<User>) => void
  authError: string | null
  clearAuthError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function loadAuthAccounts(): LocalAuthAccounts {
  return loadFromStorage<LocalAuthAccounts>(storageKeys.authAccounts, {})
}

function saveAuthAccounts(accounts: LocalAuthAccounts) {
  saveToStorage(storageKeys.authAccounts, accounts)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const clearAuthError = useCallback(() => setAuthError(null), [])

  useEffect(() => {
    const storedUser = loadFromStorage<User | null>(storageKeys.user, null)
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const buildUser = useCallback((overrides: Partial<User>) => {
    const joinedDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
    return {
      ...currentUser,
      id: `user-${Date.now()}`,
      joinedDate,
      followers: 0,
      following: 0,
      isVerified: false,
      ...overrides,
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setAuthError(null)
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 600))

    const trimmedEmail = email.trim().toLowerCase()
    if (!trimmedEmail || !password) {
      setAuthError('Enter email and password.')
      setIsLoading(false)
      return
    }

    const accounts = loadAuthAccounts()
    const record = accounts[trimmedEmail]
    if (!record || record.password !== password) {
      setAuthError('Invalid email or password. Sign up first if you are new.')
      setIsLoading(false)
      return
    }

    const storedUser = loadFromStorage<User | null>(storageKeys.user, null)
    const nextUser =
      storedUser?.email?.toLowerCase() === trimmedEmail
        ? { ...storedUser, name: record.name || storedUser.name }
        : buildUser({
            email: trimmedEmail,
            name: record.name || email.split('@')[0]?.replace(/[^a-zA-Z0-9]/g, '') || currentUser.name,
          })
    setUser(nextUser)
    saveToStorage(storageKeys.user, nextUser)
    setIsLoading(false)
  }, [buildUser])

  const logout = useCallback(() => {
    setUser(null)
    setAuthError(null)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKeys.user)
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setAuthError(null)
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))

    const trimmedEmail = email.trim().toLowerCase()
    if (!name?.trim() || !trimmedEmail || !password) {
      setAuthError('Fill in name, email, and password.')
      setIsLoading(false)
      return
    }

    const accounts = loadAuthAccounts()
    if (accounts[trimmedEmail]) {
      setAuthError('An account with this email already exists. Sign in instead.')
      setIsLoading(false)
      return
    }

    const nextAccounts = { ...accounts, [trimmedEmail]: { password, name: name.trim() } }
    saveAuthAccounts(nextAccounts)

    const nextUser = buildUser({
      name: name.trim(),
      email: trimmedEmail,
    })
    setUser(nextUser)
    saveToStorage(storageKeys.user, nextUser)
    setIsLoading(false)
  }, [buildUser])

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev
      const nextUser = { ...prev, ...updates }
      saveToStorage(storageKeys.user, nextUser)
      return nextUser
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup,
        updateUser,
        authError,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
