import { describe, expect, it } from 'vitest'

import API from '@/services/api'
import { MoviesProps } from '@/utils/types/movies'
import { PersonProps } from '@/utils/types/person'

describe('Search items', () => {
  it('slould be able to search movie', async () => {
    const filter = 'oppen'

    const response = await API.get(`/search/movie?query=${filter}`)

    const movies = response.data.results as MoviesProps[]

    console.log(movies)

    expect(response.status).toEqual(200)
    expect(Array.isArray(movies)).toBe(true)

    movies.forEach((movie) => {
      expect(movie).toHaveProperty('title')
      expect(typeof movie.title).toBe('string')
    })
  })

  it('slould be able to search person', async () => {
    const filter = 'cilli'

    const response = await API.get(`/search/person?query=${filter}`)

    const movies = response.data.results as PersonProps[]

    console.log(movies)

    expect(response.status).toEqual(200)
    expect(Array.isArray(movies)).toBe(true)

    movies.forEach((movie) => {
      expect(movie).toHaveProperty('name')
      expect(typeof movie.name).toBe('string')
    })
  })
})
