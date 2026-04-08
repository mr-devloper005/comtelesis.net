'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export function ArticlesLoginForm() {
  const { login, isLoading, isAuthenticated, authError, clearAuthError } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) router.replace('/')
  }, [isAuthenticated, router])

  return (
    <form
      className="mt-6 grid gap-4"
      onSubmit={async (e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const email = String(fd.get('email') || '')
        const password = String(fd.get('password') || '')
        await login(email, password)
      }}
    >
      {authError ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {authError}
        </p>
      ) : null}
      <input
        name="email"
        type="email"
        autoComplete="email"
        required
        onFocus={() => clearAuthError()}
        className="h-12 w-full rounded-full border-2 border-[#4A70A9]/50 bg-white px-5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#4A70A9] focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/50"
        placeholder="Email address"
      />
      <input
        name="password"
        type="password"
        autoComplete="current-password"
        required
        onFocus={() => clearAuthError()}
        className="h-12 w-full rounded-full border-2 border-[#4A70A9]/50 bg-white px-5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#4A70A9] focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/50"
        placeholder="Password"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex h-12 items-center justify-center rounded-full bg-[#4A70A9] px-6 text-sm font-semibold text-white transition hover:bg-[#3d5f8f] disabled:opacity-60"
      >
        {isLoading ? 'Signing in…' : 'Log in'}
      </button>
      <p className="text-center text-xs text-slate-500">
        Accounts are stored in this browser only (local demo).
      </p>
      <div className="flex items-center justify-between text-sm text-slate-600">
        <Link href="/forgot-password" className="hover:text-[#4A70A9] hover:underline">
          Forgot password?
        </Link>
        <Link href="/register" className="font-semibold text-[#4A70A9] hover:underline">
          Sign up
        </Link>
      </div>
    </form>
  )
}
