import { trackContactClick } from '../analytics/googleAnalytics'

export function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-copy-block">
        <h1 className="hero-title">DrawVault</h1>
        <p className="hero-summary">
          A personal repository of freehand drawings created since 2019.
        </p>
        <nav aria-label="Contact links" className="hero-contact-links">
          <a
            aria-label="Email Victor Douglas"
            className="hero-contact-link"
            href="mailto:victordouglas0412@gmail.com"
            onClick={() => trackContactClick('email')}
          >
            <svg
              aria-hidden="true"
              className="hero-contact-icon hero-contact-icon--outline"
              viewBox="0 0 24 24"
            >
              <rect height="14" rx="2" width="18" x="3" y="5" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </a>
          <a
            aria-label="Visit Victor Douglas on GitHub"
            className="hero-contact-link"
            href="https://github.com/vitinzx7"
            onClick={() => trackContactClick('github')}
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              className="hero-contact-icon hero-contact-icon--filled"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.88c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 7.32a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.27c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
            </svg>
          </a>
        </nav>
      </div>
    </section>
  )
}
