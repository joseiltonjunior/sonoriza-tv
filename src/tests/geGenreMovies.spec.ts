import { describe, expect, it } from 'vitest'

import API from '@/services/api'

import { MovieGenreProps } from '@/utils/types/movieGenres'

describe('Fetch Genre Movies', () => {
  it('slould be able to fetch genre movies in pt-BR', async () => {
    const response = await API.get('/genre/movie/list?language=pt-BR')

    const genres = response.data.genres as MovieGenreProps[]

    expect(response.status).toEqual(200)
    expect(Array.isArray(genres)).toBe(true)

    genres.forEach((movie) => {
      expect(movie).toHaveProperty('name')
      expect(typeof movie.name).toBe('string')
    })
  })

  it('slould be able to fetch genre movies in en-US', async () => {
    const response = await API.get('/genre/movie/list?language=en-US')

    const genres = response.data.genres as MovieGenreProps[]

    expect(response.status).toEqual(200)
    expect(Array.isArray(genres)).toBe(true)

    genres.forEach((movie) => {
      expect(movie).toHaveProperty('name')
      expect(typeof movie.name).toBe('string')
    })
  })
})
