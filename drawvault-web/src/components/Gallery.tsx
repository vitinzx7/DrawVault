import { useEffect, useState } from 'react'

import {
  listPublicArtworks,
  type ArtworkResponse,
} from '../api/artworks'

type GalleryStatus = 'loading' | 'success' | 'error'

export function Gallery() {
  const [artworks, setArtworks] = useState<ArtworkResponse[]>([])
  const [status, setStatus] = useState<GalleryStatus>('loading')
  const [selectedArtwork, setSelectedArtwork] =
    useState<ArtworkResponse | null>(null)

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

  useEffect(() => {
    if (!selectedArtwork) {
      return
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedArtwork(null)
      }
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => {
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [selectedArtwork])

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
              <button
                className="art-tile-button"
                onClick={() => setSelectedArtwork(artwork)}
                type="button"
              >
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
              </button>
            </article>
          ))}
        </div>
      )}
      {selectedArtwork && (
        <div
          className="art-modal"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedArtwork(null)
            }
          }}
        >
          <div
            aria-label={`Artwork preview: ${selectedArtwork.name}`}
            aria-modal="true"
            className="art-modal-content"
            role="dialog"
          >
            <button
              aria-label="Close artwork preview"
              className="art-modal-close"
              onClick={() => setSelectedArtwork(null)}
              type="button"
            >
              ×
            </button>

            {selectedArtwork.imageUrl ? (
              <img
                alt={selectedArtwork.name}
                className="art-modal-image"
                src={selectedArtwork.imageUrl}
              />
            ) : (
              <div className="art-modal-image art-preview--empty">
                Image unavailable
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
