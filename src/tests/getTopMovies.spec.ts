import { describe, expect, it } from 'vitest'

import API from '@/services/api'
import { MoviesProps } from '@/utils/types/movies'

describe('Fetch Top Rated Movies', () => {
  it('slould be able to fetch top rated movies in pt-BR', async () => {
    const response = await API.get('/movie/top_rated?language=pt-BR')

    const movies = response.data.results as MoviesProps[]

    expect(response.status).toEqual(200)
    expect(Array.isArray(movies)).toBe(true)

    movies.forEach((movie) => {
      expect(movie).toHaveProperty('title')
      expect(typeof movie.title).toBe('string')
    })
  })

  it('slould be able to fetch top rated movies in en-US', async () => {
    const response = await API.get('/movie/top_rated?language=en-US')

    const movies = response.data.results as MoviesProps[]

    expect(response.status).toEqual(200)
    expect(Array.isArray(movies)).toBe(true)

    movies.forEach((movie) => {
      expect(movie).toHaveProperty('title')
      expect(typeof movie.title).toBe('string')
    })
  })
})
