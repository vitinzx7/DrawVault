export type ArtworkResponse = {
  id: string
  name: string
  description: string
  imageUrl: string | null
  createdAt: string
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? ''

export async function listPublicArtworks(): Promise<ArtworkResponse[]> {
  const response = await fetch(`${apiBaseUrl}/api/artworks`)

  if (!response.ok) {
    throw new Error('Failed to load artworks')
  }

  return response.json() as Promise<ArtworkResponse[]>
}
