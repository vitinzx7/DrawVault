export type AnalyticsConsent = 'granted' | 'denied'

export const ANALYTICS_CONSENT_STORAGE_KEY =
  'drawvault.analytics-consent'

const GOOGLE_ANALYTICS_MEASUREMENT_ID = 'G-4G4TDL4G84'

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
  }
}

const deniedConsent = {
  ad_personalization: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  analytics_storage: 'denied',
} as const

function grantedAnalyticsConsent() {
  return {
    ...deniedConsent,
    analytics_storage: 'granted',
  } as const
}

function isLocalPreview() {
  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  )
}

export function readAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const consent = window.localStorage.getItem(
      ANALYTICS_CONSENT_STORAGE_KEY,
    )

    return consent === 'granted' || consent === 'denied' ? consent : null
  } catch {
    return null
  }
}

export function storeAnalyticsConsent(consent: AnalyticsConsent) {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent)
  } catch {
    // The choice still applies to the current page when storage is unavailable.
  }
}

function clearGoogleAnalyticsCookies() {
  const analyticsCookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0]?.trim())
    .filter(
      (cookieName): cookieName is string =>
        cookieName === '_ga' || cookieName?.startsWith('_ga_') === true,
    )

  for (const cookieName of analyticsCookieNames) {
    const expiredCookie = `${cookieName}=; Max-Age=0; Path=/; SameSite=Lax; Secure`

    document.cookie = expiredCookie
    document.cookie = `${expiredCookie}; Domain=${window.location.hostname}`
  }
}

export function updateAnalyticsConsent(consent: AnalyticsConsent) {
  window.gtag?.(
    'consent',
    'update',
    consent === 'granted' ? grantedAnalyticsConsent() : deniedConsent,
  )

  if (consent === 'denied') {
    clearGoogleAnalyticsCookies()
  }
}

export function trackArtworkOpen(
  artworkId: string,
  artworkName: string,
) {
  window.gtag?.('event', 'artwork_open', {
    artwork_id: artworkId,
    artwork_name: artworkName,
  })
}

export function trackContactClick(contactType: 'email' | 'github') {
  window.gtag?.('event', 'contact_click', {
    contact_type: contactType,
  })
}

export function initializeGoogleAnalytics() {
  if (window.gtag) {
    return
  }

  window.dataLayer = window.dataLayer ?? []
  window.gtag = function () {
    window.dataLayer?.push(arguments)
  }

  window.gtag('consent', 'default', deniedConsent)
  window.gtag('set', 'ads_data_redaction', true)

  const storedConsent = readAnalyticsConsent()

  if (storedConsent === 'granted') {
    window.gtag('consent', 'update', grantedAnalyticsConsent())
  }

  window.gtag('js', new Date())
  window.gtag('config', GOOGLE_ANALYTICS_MEASUREMENT_ID, {
    cookie_domain: window.location.hostname,
  })

  if (!import.meta.env.PROD || isLocalPreview()) {
    return
  }

  const googleTag = document.createElement('script')
  googleTag.async = true
  googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_MEASUREMENT_ID}`
  googleTag.dataset.drawvaultAnalytics = 'true'
  document.head.append(googleTag)
}
