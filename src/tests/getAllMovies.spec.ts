import { describe, expect, it } from 'vitest'

import API from '@/services/api'
import { MoviesProps } from '@/utils/types/movies'

describe('Fetch all Movies filtered', () => {
  it('slould be able to fetch all movies filtered', async () => {
    const adult = false
    const lang = 'pt-BR'
    const page = 1
    const genre = null
    const sortBy = 'popularity.desc'

    const response = await API.get(
      `/discover/movie?include_adult=${adult}&language=${lang}&page=${page}&sort_by=${sortBy}${
        genre ? `&with_genres=${genre}` : ''
      }`,
    )

    const movies = response.data.results as MoviesProps[]

    expect(response.status).toEqual(200)
    expect(Array.isArray(movies)).toBe(true)

    movies.forEach((movie) => {
      expect(movie).toHaveProperty('title')
      expect(typeof movie.title).toBe('string')
    })
  })
})
