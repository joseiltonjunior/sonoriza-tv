import { describe, expect, it } from 'vitest'

import API from '@/services/api'

import { CreditsProps } from '@/utils/types/credits'

const movieId = 872585 // Oppenheimer

describe('Fetch Cast Movie', () => {
  it('slould be able to fetch movie credits pt-BR', async () => {
    const response = await API.get(`/movie/${movieId}/credits?language=pt-BR`)

    const results = response.data.cast as CreditsProps[]

    expect(response.status).toEqual(200)
    expect(Array.isArray(results)).toBe(true)

    results.forEach((person) => {
      expect(person).toHaveProperty('name')
      expect(typeof person.name).toBe('string')
    })
  })

  it('slould be able to fetch movie credits en-US', async () => {
    const response = await API.get(`/movie/${movieId}/credits?language=en-US`)

    const results = response.data.cast as CreditsProps[]

    expect(response.status).toEqual(200)
    expect(Array.isArray(results)).toBe(true)

    results.forEach((person) => {
      expect(person).toHaveProperty('name')
      expect(typeof person.name).toBe('string')
    })
  })
})
