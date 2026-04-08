import { FileText } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'
import { ArticlesRegisterForm } from '@/components/auth/articles-register-form'
import { SITE_CONFIG } from '@/lib/site-config'

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  return (
    <div className="min-h-screen bg-[#EFECE3] pb-32 text-black">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-2xl border border-[#8FABD4]/40 bg-white/60 p-8 shadow-sm backdrop-blur-sm">
            <FileText className="h-8 w-8 text-[#4A70A9]" />
            <h1 className="mt-5 text-4xl font-semibold tracking-tight">Join {SITE_CONFIG.name}</h1>
            <p className="mt-5 text-sm leading-8 text-black/60">
              Create a free reader account. Your credentials are stored only in this browser so you can sign in locally.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-black/65">
              {['Follow topics and trending pieces', 'Save articles to read later', 'Optional: open the dashboard to draft posts'].map((item) => (
                <div key={item} className="rounded-xl border border-[#8FABD4]/35 bg-[#EFECE3] px-4 py-3">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white p-8 text-slate-900 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Create account</p>
            <ArticlesRegisterForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
