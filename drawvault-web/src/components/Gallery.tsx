import { useEffect, useState } from 'react'

import {
  listPublicArtworks,
  type ArtworkResponse,
} from '../api/artworks'

type GalleryStatus = 'loading' | 'success' | 'error'

export function Gallery() {
  const [artworks, setArtworks] = useState<ArtworkResponse[]>([])
  const [status, setStatus] = useState<GalleryStatus>('loading')

  useEffect(() => {
    let active = true

    async function loadArtworks() {
      try {
        const publicArtworks = await listPublicArtworks()

        if (active) {
          setArtworks(publicArtworks)
          setStatus('success')
        }
      } catch {
        if (active) {
          setStatus('error')
        }
      }
    }

    void loadArtworks()

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="section" id="gallery">
      <div className="section-header">
        <h2 className="section-title">Gallery</h2>
      </div>

      {status === 'loading' && (
        <p className="gallery-status" role="status">
          Loading artworks...
        </p>
      )}

      {status === 'error' && (
        <p className="gallery-status" role="alert">
          Could not load the gallery. Please try again later.
        </p>
      )}

      {status === 'success' && artworks.length === 0 && (
        <p className="gallery-status">No artworks published yet.</p>
      )}

      {status === 'success' && artworks.length > 0 && (
        <div className="gallery-grid">
          {artworks.map((artwork) => (
            <article className="art-tile" key={artwork.id}>
              {artwork.imageUrl ? (
                <img
                  alt={artwork.name}
                  className="art-preview"
                  src={artwork.imageUrl}
                />
              ) : (
                <div className="art-preview art-preview--empty">
                  Image unavailable
                </div>
              )}
              <h3>{artwork.name}</h3>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
