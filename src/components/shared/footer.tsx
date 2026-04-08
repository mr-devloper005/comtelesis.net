import Link from 'next/link'
import { FileText, BookOpenText, Layers, PenSquare, Github, Twitter, Linkedin, ArrowRight, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { FOOTER_OVERRIDE_ENABLED, FooterOverride } from '@/overrides/footer'

const footerLinks = {
  platform: [
    { name: 'Latest Articles', href: '/articles', icon: BookOpenText },
    { name: 'Topics', href: '/topics', icon: Layers },
    { name: 'Editorial Picks', href: '/blog', icon: PenSquare },
    { name: 'Search', href: '/search', icon: FileText },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Editorial Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Newsroom', href: '/press' },
    { name: 'Press', href: '/press' },
  ],
  resources: [
    { name: 'Writing Guide', href: '/editorial-guidelines' },
    { name: 'Help Center', href: '/help' },
    { name: 'Reader Community', href: '/community' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export function Footer() {
  if (FOOTER_OVERRIDE_ENABLED) {
    return <FooterOverride />
  }

  const { recipe } = getFactoryState()
  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]

  if (recipe.footer === 'minimal-footer') {
    return (
      <footer className="border-t border-[#8FABD4]/40 bg-[#E8E4DB] pb-12 text-black">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
            <p className="mt-1 text-sm text-black/60">{SITE_CONFIG.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {enabledTasks.slice(0, 5).map((task) => (
              <Link
                key={task.key}
                href={task.route}
                className="rounded-full border border-[#8FABD4]/50 bg-white/80 px-4 py-2 text-sm font-medium text-black hover:bg-[#8FABD4]/25"
              >
                {task.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'dense-footer') {
    return (
      <footer className="border-t border-[#8FABD4]/40 bg-[#E8E4DB] pb-12 text-black">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_1fr]">
            <div className="rounded-[2rem] border border-[#8FABD4]/40 bg-white/70 p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#8FABD4]/40 bg-[#EFECE3] p-1.5">
                  <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-black/45">{siteContent.footer.tagline}</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-black/65">{SITE_CONFIG.description}</p>
              {primaryTask ? (
                <Link href={primaryTask.route} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4A70A9] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#3d5f8f]">
                  Explore {primaryTask.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">Surfaces</h3>
                <ul className="mt-4 space-y-3 text-sm text-black/75">
                  {footerLinks.platform.map((item: any) => (
                    <li key={item.name}><Link href={item.href} className="flex items-center gap-2 hover:text-[#4A70A9]">{item.icon ? <item.icon className="h-4 w-4" /> : null}{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">Resources</h3>
                <ul className="mt-4 space-y-3 text-sm text-black/75">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}><Link href={item.href} className="hover:text-[#4A70A9]">{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">Connect</h3>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((item) => (
                    <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[#8FABD4]/50 bg-white/80 p-2.5 text-black/70 hover:bg-[#8FABD4]/25 hover:text-black">
                      <item.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-[#8FABD4]/40 pt-5 text-sm text-black/50">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'editorial-footer') {
    return (
        <footer className="border-t border-[#8FABD4]/40 bg-[#E8E4DB] pb-12 text-black">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#4A70A9]/35 bg-[#8FABD4]/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2f4a6e]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Article feed
                </div>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{SITE_CONFIG.name}</h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-black/60">{SITE_CONFIG.description}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">Explore</h4>
                <ul className="mt-4 space-y-3 text-sm text-black/80">
                  {footerLinks.platform.map((item: any) => (
                    <li key={item.name}>
                      <Link href={item.href} className="hover:text-[#4A70A9]">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">Site</h4>
                <ul className="mt-4 space-y-3 text-sm text-black/80">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="hover:text-[#4A70A9]">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-4 border-t border-[#8FABD4]/40 pt-8">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#8FABD4]/50 bg-white/80 p-2.5 text-black/65 hover:bg-[#8FABD4]/25 hover:text-black"
                >
                  <item.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
            <div className="mt-8 text-sm text-black/45">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
          </div>
        </footer>
    )
  }

  return (
      <footer className="border-t border-[#8FABD4]/40 bg-[#E8E4DB] pb-12 text-black">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
            <div>
              <Link href="/" className="flex items-center gap-3">
                <div className="h-11 w-11 overflow-hidden rounded-2xl border border-[#8FABD4]/50 bg-white/80 p-1">
                  <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="44" height="44" className="h-full w-full object-contain" />
                </div>
                <div>
                  <span className="block text-lg font-semibold">{SITE_CONFIG.name}</span>
                  <span className="text-xs uppercase tracking-[0.22em] text-black/45">{siteContent.footer.tagline}</span>
                </div>
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-7 text-black/60">{SITE_CONFIG.description}</p>
            </div>
            {(['platform', 'company', 'resources', 'legal'] as const).map((section) => (
              <div key={section}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-black/45">{section}</h3>
                <ul className="mt-5 space-y-3 text-sm text-black/75">
                  {footerLinks[section].map((item: any) => (
                    <li key={item.name}>
                      <Link href={item.href} className="flex items-center gap-2 hover:text-[#4A70A9]">
                        {item.icon ? <item.icon className="h-4 w-4" /> : null}
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-[#8FABD4]/40 pt-6 text-center text-sm text-black/45">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </div>
        </div>
      </footer>
  )
}
