import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { listPublicArtworks } from '../api/artworks'
import { Gallery } from './Gallery'

vi.mock('../api/artworks', () => ({
  listPublicArtworks: vi.fn(),
}))

vi.mock('../analytics/googleAnalytics', () => ({
  trackArtworkOpen: vi.fn(),
}))

const artwork = {
  id: 'f4a4d7d4-bfe7-4af5-9e34-c44c4b742002',
  name: 'Anime garota',
  description: '',
  imageUrl: '/artworks/anime-garota.webp',
  createdAt: '2026-07-23T12:00:00Z',
}

const listPublicArtworksMock = vi.mocked(listPublicArtworks)

afterEach(() => {
  listPublicArtworksMock.mockReset()
})

describe('Gallery', () => {
  it('shows a recoverable error when the artwork API fails', async () => {
    listPublicArtworksMock.mockRejectedValueOnce(new Error('Network error'))

    render(<Gallery />)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Could not load the gallery. Please try again later.',
    )
  })

  it('opens the selected artwork and closes it with Escape', async () => {
    const user = userEvent.setup()
    listPublicArtworksMock.mockResolvedValueOnce([artwork])

    render(<Gallery />)

    await user.click(
      await screen.findByRole('button', { name: /anime girl/i }),
    )

    expect(
      screen.getByRole('dialog', { name: 'Artwork preview: Anime Girl' }),
    ).toBeInTheDocument()

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })
})
