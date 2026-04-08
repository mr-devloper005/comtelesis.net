'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export function ArticlesRegisterForm() {
  const { signup, isLoading, isAuthenticated, authError, clearAuthError } = useAuth()
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
        const name = String(fd.get('name') || '')
        const email = String(fd.get('email') || '')
        const password = String(fd.get('password') || '')
        await signup(name, email, password)
      }}
    >
      {authError ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {authError}
        </p>
      ) : null}
      <input
        name="name"
        autoComplete="name"
        required
        onFocus={() => clearAuthError()}
        className="h-12 w-full rounded-full border-2 border-[#4A70A9]/50 bg-white px-5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/50"
        placeholder="Display name"
      />
      <input
        name="email"
        type="email"
        autoComplete="email"
        required
        onFocus={() => clearAuthError()}
        className="h-12 w-full rounded-full border-2 border-[#4A70A9]/50 bg-white px-5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/50"
        placeholder="Email address"
      />
      <input
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={4}
        onFocus={() => clearAuthError()}
        className="h-12 w-full rounded-full border-2 border-[#4A70A9]/50 bg-white px-5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/50"
        placeholder="Password (min 4 characters)"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex h-12 items-center justify-center rounded-full bg-[#4A70A9] px-6 text-sm font-semibold text-white transition hover:bg-[#3d5f8f] disabled:opacity-60"
      >
        {isLoading ? 'Creating account…' : 'Sign up'}
      </button>
      <p className="text-center text-xs text-slate-500">
        Your email and password are saved in localStorage on this device only.
      </p>
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>Already have an account?</span>
        <Link href="/login" className="font-semibold text-[#4A70A9] hover:underline">
          Log in
        </Link>
      </div>
    </form>
  )
}
