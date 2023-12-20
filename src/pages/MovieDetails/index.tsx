import { useToast } from '@/hooks/useToast'
import API from '@/services/api'
import { ReduxProps } from '@/storage'
import { LanguageProps } from '@/storage/modules/language/reducer'
import { MovieDetailsProps } from '@/utils/types/movieDetails'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  AddFavorite,
  Container,
  ContentBackground,
  ContentGenres,
  ContentHeader,
  ContentInfo,
  MovieBackgroud,
  RowContent,
} from './styles'
import { Header } from '@/components/Header'
import { formatDate } from '@/utils/formatDate'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { colors } from '@/styles/colors'
import {
  FavoritesProps,
  setFavorites,
} from '@/storage/modules/favorites/reducer'

export function MovieDetails() {
  const { id } = useParams()

  const { lang } = useSelector<ReduxProps, LanguageProps>(
    (item) => item.language,
  )

  const { favorites } = useSelector<ReduxProps, FavoritesProps>(
    (item) => item.favorites,
  )

  const { showToast } = useToast()

  const dispatch = useDispatch()

  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps>()

  const handleGetMovieDB = useCallback(async () => {
    await API.get(`/movie/${id}?language=${lang}`)
      .then((result) => {
        setMovieDetails(result.data)
      })
      .catch(() =>
        showToast('Error while fetching movies', {
          type: 'error',
          theme: 'colored',
        }),
      )
  }, [lang, showToast, id])

  const isFavorite = useMemo(() => {
    const filter = favorites.find((item) => item.id === movieDetails?.id)

    if (filter) {
      return true
    } else {
      return false
    }
  }, [favorites, movieDetails?.id])

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
            <div>
              <h1>{movieDetails.title}</h1>
              <RowContent>
                <p>{formatDate(movieDetails.release_date)}</p>
                <ContentGenres>
                  {movieDetails.genres.map((item, index) => (
                    <p key={item.id}>
                      {item.name}
                      {index + 1 !== movieDetails.genres.length && ', '}
                    </p>
                  ))}
                </ContentGenres>
              </RowContent>
            </div>
            <AddFavorite
              title="Adicionar aos favoritos"
              onClick={() => dispatch(setFavorites(movieDetails))}
            >
              {isFavorite ? (
                <MdFavorite size={20} color={colors.Light} />
              ) : (
                <MdFavoriteBorder size={20} color={colors.Light} />
              )}
            </AddFavorite>

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
