'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#EFECE3] text-black">
      <NavbarShell />
      <main className="pb-12">
        <section className="border-b border-[#8FABD4]/40 bg-white/60 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-black">{title}</h1>
                {description && (
                  <p className="mt-2 max-w-2xl text-black/60">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-[#8FABD4]/40 bg-white p-6 text-slate-900 shadow-sm sm:p-8">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
