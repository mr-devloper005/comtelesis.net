export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'comtelesis',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'ComTelesis',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Independent article publication',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A fully article-first publication for essays, insights, analysis, and curated reading across topics and contributors.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'comtelesis.net',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://comtelesis.net',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

