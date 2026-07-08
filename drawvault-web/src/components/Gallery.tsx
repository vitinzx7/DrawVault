import type { CSSProperties } from 'react'

import { mockArtworks } from '../data/mockArtworks'

const sheetPosition = {
  'top-left': '0% 0%',
  'top-right': '100% 0%',
  'bottom-left': '0% 100%',
  'bottom-right': '100% 100%',
}

export function Gallery() {
  return (
    <section className="section" id="gallery">
      <div className="section-header">
        <h2 className="section-title">Gallery</h2>
      </div>

      <div className="gallery-grid">
        {mockArtworks.map((artwork) => (
          <article className="art-tile" key={artwork.id}>
            <div
              aria-label={artwork.title}
              className="art-preview"
              role="img"
              style={
                {
                  '--art-position': sheetPosition[artwork.sheetPosition],
                } as CSSProperties
              }
            />
            <h3>{artwork.title}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}
