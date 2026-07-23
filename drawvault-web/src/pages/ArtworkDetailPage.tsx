import { useParams } from 'react-router-dom'

export function ArtworkDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <section className="section">
      <h1 className="section-title">Artwork details</h1>
      <p>Artwork ID: {id ?? 'Unavailable'}</p>
    </section>
  )
}
