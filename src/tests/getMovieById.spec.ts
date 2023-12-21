import { describe, expect, it } from 'vitest'

import API from '@/services/api'

import { MovieDetailsProps } from '@/utils/types/movieDetails'

const movieId = 872585 // Oppenheimer

describe('Fetch Movie By Id', () => {
  it('slould be able to fetch movie details pt-BR', async () => {
    const response = await API.get(
      `/movie/${movieId}/recommendations?language=pt-BR`,
    )

    const results = response.data.results as MovieDetailsProps[]

    expect(response.status).toEqual(200)
    expect(Array.isArray(results)).toBe(true)

    results.forEach((movie) => {
      expect(movie).toHaveProperty('title')
      expect(typeof movie.title).toBe('string')
    })
  })

  it('slould be able to fetch movie details en-US', async () => {
    const response = await API.get(
      `/movie/${movieId}/recommendations?language=en-US`,
    )

    const results = response.data.results as MovieDetailsProps[]

    expect(response.status).toEqual(200)
    expect(Array.isArray(results)).toBe(true)

    results.forEach((movie) => {
      expect(movie).toHaveProperty('title')
      expect(typeof movie.title).toBe('string')
    })
  })
})
