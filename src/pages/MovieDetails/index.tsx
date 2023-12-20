import { useToast } from '@/hooks/useToast'
import API from '@/services/api'
import { ReduxProps } from '@/storage'
import { LanguageProps } from '@/storage/modules/language/reducer'
import { MovieDetailsProps } from '@/utils/types/movieDetails'

import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  Container,
  ContentBackground,
  ContentGenres,
  ContentHeader,
  ContentInfo,
  MovieBackgroud,
} from './styles'
import { Header } from '@/components/Header'
import { formatDate } from '@/utils/formatDate'

export function MovieDetails() {
  const { id } = useParams()

  const { lang } = useSelector<ReduxProps, LanguageProps>(
    (item) => item.language,
  )

  const { showToast } = useToast()

  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps>()

  const handleGetMovieDB = useCallback(async () => {
    await API.get(`/movie/${id}?language=${lang}`)
      .then((result) => {
        console.log(result)
        setMovieDetails(result.data)
      })
      .catch(() =>
        showToast('Error while fetching movies', {
          type: 'error',
          theme: 'colored',
        }),
      )
  }, [lang, showToast, id])

  useEffect(() => {
    handleGetMovieDB()
  }, [handleGetMovieDB])

  if (!movieDetails) return

  return (
    <>
      <Header />
      <ContentHeader>
        <MovieBackgroud
          src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
          alt="backdrop"
        />
        <ContentBackground>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt=""
          />

          <ContentInfo>
            <h1>{movieDetails.title}</h1>
            <div>
              <p>{formatDate(movieDetails.release_date)}</p>
              <ContentGenres>
                {movieDetails.genres.map((item, index) => (
                  <p key={item.id}>
                    {item.name}
                    {index + 1 !== movieDetails.genres.length && ', '}
                  </p>
                ))}
              </ContentGenres>
            </div>

            <h4>{movieDetails.tagline}</h4>

            <h3>Sinopse</h3>
            <span>{movieDetails.overview}</span>
          </ContentInfo>
        </ContentBackground>
      </ContentHeader>
      <Container></Container>
    </>
  )
}
