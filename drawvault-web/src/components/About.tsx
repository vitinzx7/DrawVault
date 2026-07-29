export function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-header">
        <h2 className="section-title">About</h2>
      </div>
      <div className="about-layout">
        <div className="about-copy">
          <p className="about-intro">
            A public gallery where I share my drawings.
          </p>

          <ul className="about-highlights">
            <li className="about-highlight">
              <span className="about-highlight-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <rect height="14" rx="2" width="18" x="3" y="4" />
                  <path d="M8 21h8M12 18v3" />
                </svg>
              </span>
              <div>
                <h3>Website</h3>
                <p>React and TypeScript keep it fast and responsive.</p>
              </div>
            </li>

            <li className="about-highlight">
              <span className="about-highlight-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <ellipse cx="12" cy="5" rx="8" ry="3" />
                  <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
                  <path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
                </svg>
              </span>
              <div>
                <h3>Behind the site</h3>
                <p>Java, Spring Boot, and PostgreSQL run the gallery on Azure.</p>
              </div>
            </li>

            <li className="about-highlight">
              <span className="about-highlight-icon">
                <svg aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12 3 5 6v5c0 4.6 2.9 8.8 7 10 4.1-1.2 7-5.4 7-10V6l-7-3Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <div>
                <h3>Security</h3>
                <p>HTTPS protects visits. Visitors can view, but not change, drawings.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
