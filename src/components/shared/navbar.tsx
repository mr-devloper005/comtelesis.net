'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, ChevronRight, Sparkles, MapPin, Plus, House, BookOpenText, Layers, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { NAVBAR_OVERRIDE_ENABLED, NavbarOverride } from '@/overrides/navbar'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-[#8FABD4]/40 bg-[#EFECE3] text-black backdrop-blur-xl',
    logo: 'rounded-2xl border border-[#8FABD4]/50 bg-white/70 shadow-sm',
    active: 'bg-[#4A70A9]/15 text-black ring-1 ring-[#4A70A9]/35',
    idle: 'text-black/65 hover:bg-[#8FABD4]/25 hover:text-black',
    cta: 'rounded-full bg-[#4A70A9] text-white hover:bg-[#3d5f8f]',
    mobile: 'border-t border-[#8FABD4]/40 bg-[#EFECE3]',
  },
  'editorial-bar': {
    shell: 'border-b border-[#8FABD4]/40 bg-[#EFECE3] text-black backdrop-blur-xl',
    logo: 'rounded-2xl border border-[#8FABD4]/50 bg-white/70 shadow-sm',
    active: 'bg-[#4A70A9]/15 text-black ring-1 ring-[#4A70A9]/35',
    idle: 'text-black/65 hover:bg-[#8FABD4]/25 hover:text-black',
    cta: 'rounded-full bg-[#4A70A9] text-white hover:bg-[#3d5f8f]',
    mobile: 'border-t border-[#8FABD4]/40 bg-[#EFECE3]',
  },
  'floating-bar': {
    shell: 'border-b border-[#8FABD4]/40 bg-[#EFECE3]/95 text-black backdrop-blur-xl',
    logo: 'rounded-[1.35rem] border border-[#8FABD4]/50 bg-white/80 shadow-sm backdrop-blur',
    active: 'bg-[#4A70A9]/15 text-black ring-1 ring-[#4A70A9]/35',
    idle: 'text-black/65 hover:bg-[#8FABD4]/25 hover:text-black',
    cta: 'rounded-full bg-[#4A70A9] text-white hover:bg-[#3d5f8f]',
    mobile: 'border-t border-[#8FABD4]/40 bg-[#EFECE3]',
  },
  'utility-bar': {
    shell: 'border-b border-[#8FABD4]/40 bg-[#EFECE3] text-black backdrop-blur-xl',
    logo: 'rounded-xl border border-[#8FABD4]/50 bg-white/70 shadow-sm',
    active: 'bg-[#4A70A9]/15 text-black ring-1 ring-[#4A70A9]/35',
    idle: 'text-black/65 hover:bg-[#8FABD4]/25 hover:text-black',
    cta: 'rounded-full bg-[#4A70A9] text-white hover:bg-[#3d5f8f]',
    mobile: 'border-t border-[#8FABD4]/40 bg-[#EFECE3]',
  },
} as const

const directoryPalette = {
  'directory-clean': {
    shell: 'border-b border-[#8FABD4]/40 bg-[#EFECE3] text-black backdrop-blur-xl',
    logo: 'rounded-2xl border border-[#8FABD4]/50 bg-white/70 shadow-sm',
    nav: 'text-black/65 hover:text-black',
    search: 'rounded-full border border-[#4A70A9]/35 bg-white text-black/80',
    cta: 'bg-[#4A70A9] text-white hover:bg-[#3d5f8f]',
    post: 'border border-[#8FABD4]/35 bg-white/80 text-black hover:bg-[#8FABD4]/15',
    mobile: 'border-t border-[#8FABD4]/40 bg-[#EFECE3]',
  },
  'market-utility': {
    shell: 'border-b border-[#8FABD4]/40 bg-[#EFECE3] text-black backdrop-blur-xl',
    logo: 'rounded-xl border border-[#8FABD4]/50 bg-white/70 shadow-sm',
    nav: 'text-black/65 hover:text-black',
    search: 'rounded-full border border-[#4A70A9]/35 bg-white text-black/80',
    cta: 'bg-[#4A70A9] text-white hover:bg-[#3d5f8f]',
    post: 'border border-[#8FABD4]/35 bg-white/80 text-black hover:bg-[#8FABD4]/15',
    mobile: 'border-t border-[#8FABD4]/40 bg-[#EFECE3]',
  },
} as const

export function Navbar() {
  if (NAVBAR_OVERRIDE_ENABLED) {
    return <NavbarOverride />
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const primaryNavigation = useMemo(
    () => [
      { name: 'Home', href: '/', icon: House },
      { name: 'Articles', href: '/articles', icon: BookOpenText },
      { name: 'Topics', href: '/topics', icon: Layers },
      { name: 'About', href: '/about', icon: Sparkles },
      { name: 'Contact', href: '/contact', icon: Mail },
    ],
    []
  )
  const mobileNavigation = primaryNavigation
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]

    return (
      <>
        <header className={cn('sticky top-0 z-50 w-full xl:hidden', palette.shell)}>
          <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <Link href="/" className="flex min-w-0 items-center gap-3">
                <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden p-1.5', palette.logo)}>
                  <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="44" height="44" className="h-full w-full object-contain" />
                </div>
                <div className="min-w-0">
                  <span className="block truncate text-lg font-semibold">{SITE_CONFIG.name}</span>
                  <span className="block truncate text-[10px] uppercase tracking-[0.22em] opacity-60">{siteContent.navbar.tagline}</span>
                </div>
              </Link>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {!isAuthenticated ? (
                <Button size="sm" asChild className={cn('rounded-full', palette.cta)}>
                  <Link href="/register">
                    <Plus className="mr-1 h-4 w-4" />
                    Sign up
                  </Link>
                </Button>
              ) : (
                <NavbarAuthControls />
              )}
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </nav>

          {isMobileMenuOpen && (
            <div className={palette.mobile}>
              <div className="space-y-2 px-4 py-4">
                <form action="/search" className={cn('mb-3 flex items-center gap-2 rounded-2xl px-3 py-2', palette.search)}>
                  <Search className="h-4 w-4 shrink-0 opacity-70" />
                  <input
                    name="q"
                    type="search"
                    placeholder="Search articles..."
                    className="h-8 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:opacity-70"
                    aria-label="Search articles"
                  />
                  <Button type="submit" size="sm" className={cn('h-8 rounded-full px-3 text-xs', palette.cta)}>
                    Go
                  </Button>
                </form>
                {mobileNavigation.map((item) => {
                  const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                  return (
                    <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? 'bg-foreground text-background' : palette.post)}>
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </header>

        <aside className={cn('hidden xl:fixed xl:inset-y-0 xl:left-0 xl:z-40 xl:flex xl:w-80 xl:flex-col xl:border-r xl:px-6 xl:py-7 xl:pb-12', palette.shell)}>
          <div className="flex h-full flex-col">
            <Link href="/" className="flex items-center gap-3">
              <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden p-1.5', palette.logo)}>
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0">
                <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
                <span className="block truncate text-[10px] uppercase tracking-[0.24em] opacity-60">{siteContent.navbar.tagline}</span>
              </div>
            </Link>

            <form action="/search" className={cn('mt-7 flex items-center gap-2 rounded-full px-3 py-2 text-sm transition hover:opacity-90', palette.search)}>
              <Search className="h-4 w-4 shrink-0 text-[#4A70A9]" />
              <input
                name="q"
                type="search"
                placeholder="Search articles..."
                className="h-8 min-w-0 flex-1 bg-transparent outline-none placeholder:opacity-70"
                aria-label="Search articles"
              />
              <Button type="submit" size="sm" className={cn('h-8 rounded-full px-3 text-xs', palette.cta)}>
                Go
              </Button>
            </form>

            <nav className="mt-8 space-y-2">
              {primaryNavigation.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors',
                      isActive ? 'bg-foreground text-background' : palette.post,
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="mt-8 grid gap-3">
              <div className={cn('rounded-[1.6rem] px-4 py-4 text-sm', palette.post)}>
                <div className="flex items-center gap-2 font-semibold">
                  <MapPin className="h-4 w-4" />
                  Editorial navigation
                </div>
                <p className="mt-2 text-xs leading-6 opacity-75">Quick links for reading, topics, and editorial pages in one place.</p>
              </div>
            </div>

            <div className="mt-auto space-y-3 pt-8">
              {isAuthenticated ? (
                <NavbarAuthControls />
              ) : (
                <div className="space-y-3">
                  <Button variant="ghost" size="sm" asChild className="w-full justify-center rounded-full border border-[#4A70A9]/40 bg-transparent px-4 text-black hover:bg-[#8FABD4]/20">
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button size="sm" asChild className={cn('w-full justify-center rounded-full', palette.cta)}>
                    <Link href="/register">
                      <Plus className="mr-1 h-4 w-4" />
                      Sign up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </aside>
      </>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'

  return (
    <>
      <header data-mobile-nav="true" className={cn('sticky top-0 z-50 w-full xl:hidden', style.shell)}>
        <nav className={cn('mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8', isFloating ? 'h-24 pt-4' : 'h-20')}>
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden p-1.5', style.logo)}>
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0">
                <span className="block truncate text-lg font-semibold">{SITE_CONFIG.name}</span>
                <span className="block truncate text-[10px] uppercase tracking-[0.22em] opacity-70">{siteContent.navbar.tagline}</span>
              </div>
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {!isAuthenticated ? (
              <Button size="sm" asChild className={cn('rounded-full', style.cta)}>
                <Link href="/register">
                  <Plus className="mr-1 h-4 w-4" />
                  Sign up
                </Link>
              </Button>
            ) : (
              <NavbarAuthControls />
            )}
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className={style.mobile}>
            <div className="space-y-2 px-4 py-4">
              <form action="/search" className="mb-3 flex items-center gap-2 rounded-full border border-[#4A70A9]/40 bg-white px-3 py-2 text-sm text-black/80 shadow-sm">
                <Search className="h-4 w-4 shrink-0 text-[#4A70A9]" />
                <input
                  name="q"
                  type="search"
                  placeholder="Search articles..."
                  className="h-8 min-w-0 flex-1 bg-transparent outline-none placeholder:text-black/45"
                  aria-label="Search articles"
                />
                <Button type="submit" size="sm" className={cn('h-8 rounded-full px-3 text-xs', style.cta)}>
                  Go
                </Button>
              </form>
              {mobileNavigation.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>

      <aside className={cn('hidden xl:fixed xl:inset-y-0 xl:left-0 xl:z-40 xl:flex xl:w-80 xl:flex-col xl:overflow-y-auto xl:border-r xl:px-6 xl:py-7 xl:pb-12', style.shell)}>
        <div className="flex h-full flex-col">
          <Link href="/" className="flex items-center gap-3">
            <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden p-1.5', style.logo)}>
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
              <span className="block truncate text-[10px] uppercase tracking-[0.24em] opacity-70">{siteContent.navbar.tagline}</span>
            </div>
          </Link>

          <form
            action="/search"
            className={cn(
              'mt-7 flex items-center gap-2 rounded-full border border-[#4A70A9]/40 bg-white px-3 py-2 text-sm text-black/80 shadow-sm transition hover:border-[#4A70A9]/60',
            )}
          >
            <Search className="h-4 w-4 shrink-0 text-[#4A70A9]" />
            <input
              name="q"
              type="search"
              placeholder="Search articles..."
              className="h-8 min-w-0 flex-1 bg-transparent outline-none placeholder:text-black/45"
              aria-label="Search articles"
            />
            <Button type="submit" size="sm" className={cn('h-8 rounded-full px-3 text-xs', style.cta)}>
              Go
            </Button>
          </form>

          <nav className="mt-8 space-y-2">
            {primaryNavigation.map((item) => {
              const Icon = item.icon
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <Link key={item.name} href={item.href} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.name}</span>
                  <ChevronRight className="ml-auto h-4 w-4 opacity-45" />
                </Link>
              )
            })}
          </nav>

          <div className="mt-8 space-y-3">
            <div className="rounded-xl border border-[#8FABD4]/40 bg-white/50 px-4 py-4 text-sm text-black/75">
              <div className="font-semibold text-black">Topics & saves</div>
              <p className="mt-2 text-xs leading-6 text-black/55">Use Articles for the main feed and your dashboard for drafts and saved reads.</p>
            </div>
          </div>

          <div className="mt-auto space-y-3 pt-8">
            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="space-y-3">
                <Button variant="ghost" size="sm" asChild className="w-full justify-center rounded-full border border-[#4A70A9]/40 bg-transparent px-4 text-black hover:bg-[#8FABD4]/20">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button size="sm" asChild className={cn('w-full justify-center rounded-full', style.cta)}>
                  <Link href="/register">
                    <Plus className="mr-1 h-4 w-4" />
                    Sign up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )

}
