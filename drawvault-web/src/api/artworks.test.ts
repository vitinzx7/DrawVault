import { afterEach, describe, expect, it, vi } from 'vitest'

import { getPublicArtwork, listPublicArtworks } from './artworks'

const artwork = {
  id: 'f4a4d7d4-bfe7-4af5-9e34-c44c4b742001',
  name: 'Meliodas X Zeldris',
  description: '',
  imageUrl: '/artworks/meliodas-x-zeldris.webp',
  createdAt: '2026-07-23T12:00:00Z',
}

const fetchMock = vi.fn()

vi.stubGlobal('fetch', fetchMock)

afterEach(() => {
  fetchMock.mockReset()
})

describe('artworks API', () => {
  it('returns the public artworks when the API responds successfully', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => [artwork],
    } as Response)

    await expect(listPublicArtworks()).resolves.toEqual([artwork])
    expect(fetchMock).toHaveBeenCalledWith('/api/artworks')
  })

  it('returns null for an artwork that the API cannot find', async () => {
    const artworkId = 'artwork/does-not-exist'

    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response)

    await expect(getPublicArtwork(artworkId)).resolves.toBeNull()
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/artworks/artwork%2Fdoes-not-exist',
    )
  })
})
