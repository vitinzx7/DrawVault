import { useState } from 'react'
import {
  type AnalyticsConsent as AnalyticsConsentChoice,
  readAnalyticsConsent,
  storeAnalyticsConsent,
  updateAnalyticsConsent,
} from '../analytics/googleAnalytics'

type ConsentState = {
  choice: AnalyticsConsentChoice | null
  isOpen: boolean
}

function initialConsentState(): ConsentState {
  const choice = readAnalyticsConsent()

  return {
    choice,
    isOpen: choice === null,
  }
}

export function AnalyticsConsent() {
  const [consent, setConsent] = useState(initialConsentState)

  function chooseAnalyticsConsent(choice: AnalyticsConsentChoice) {
    storeAnalyticsConsent(choice)
    updateAnalyticsConsent(choice)
    setConsent({ choice, isOpen: false })
  }

  if (!consent.isOpen) {
    return (
      <button
        aria-label="Review cookie preferences"
        className="analytics-consent-settings"
        onClick={() =>
          setConsent((current) => ({ ...current, isOpen: true }))
        }
        type="button"
      >
        Cookies
      </button>
    )
  }

  return (
    <aside
      aria-labelledby="analytics-consent-title"
      className="analytics-consent"
    >
      <div className="analytics-consent-copy">
        <div className="analytics-consent-heading">
          <svg
            aria-hidden="true"
            className="analytics-consent-icon"
            viewBox="0 0 24 24"
          >
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" />
            <circle cx="8.5" cy="8.5" r="1" />
            <circle cx="12" cy="13" r="1" />
            <circle cx="8" cy="16" r="1" />
          </svg>
          <h2 id="analytics-consent-title">Cookies</h2>
        </div>
        <p>
          Cookies help DrawVault understand how visitors find and explore the
          gallery. If you continue without them, only limited, cookieless
          measurements are used. You can change your choice anytime.
        </p>
      </div>

      <div
        aria-label="Cookie options"
        className="analytics-consent-actions"
        role="group"
      >
        <button
          aria-pressed={consent.choice === 'granted'}
          className="analytics-consent-button analytics-consent-button--primary"
          onClick={() => chooseAnalyticsConsent('granted')}
          type="button"
        >
          Allow cookies
        </button>
        <button
          aria-pressed={consent.choice === 'denied'}
          className="analytics-consent-button analytics-consent-button--secondary"
          onClick={() => chooseAnalyticsConsent('denied')}
          type="button"
        >
          Without cookies
        </button>
      </div>
    </aside>
  )
}
