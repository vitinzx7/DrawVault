import { useEffect, useState, type CSSProperties } from 'react'

import {
  listPublicArtworks,
  type ArtworkResponse,
} from '../api/artworks'

type GalleryStatus = 'loading' | 'success' | 'error'

const MODAL_CLOSE_DURATION_MS = 160
const REDUCED_MOTION_CLOSE_DURATION_MS = 80

export function Gallery() {
  const [artworks, setArtworks] = useState<ArtworkResponse[]>([])
  const [status, setStatus] = useState<GalleryStatus>('loading')
  const [selectedArtwork, setSelectedArtwork] =
    useState<ArtworkResponse | null>(null)
  const [isModalClosing, setIsModalClosing] = useState(false)

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
    if (!isModalClosing) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const closeDuration = prefersReducedMotion
      ? REDUCED_MOTION_CLOSE_DURATION_MS
      : MODAL_CLOSE_DURATION_MS
    const closeTimer = window.setTimeout(() => {
      setSelectedArtwork(null)
      setIsModalClosing(false)
    }, closeDuration)

    return () => {
      window.clearTimeout(closeTimer)
    }
  }, [isModalClosing])

  useEffect(() => {
    if (!selectedArtwork) {
      return
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsModalClosing(true)
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
        <div className="gallery-loader" role="status">
          <span aria-hidden="true" className="gallery-loader-orbit" />
          <span className="visually-hidden">Loading artworks...</span>
        </div>
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
          {artworks.map((artwork, index) => (
            <article
              className="art-tile"
              key={artwork.id}
              style={
                {
                  '--card-index': Math.min(index, 5),
                } as CSSProperties
              }
            >
              <button
                className="art-tile-button"
                onClick={() => {
                  setSelectedArtwork(artwork)
                  setIsModalClosing(false)
                }}
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
          className={`art-modal${isModalClosing ? ' art-modal--closing' : ''}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsModalClosing(true)
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
              onClick={() => setIsModalClosing(true)}
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
