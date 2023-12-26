import { useToast } from '@/hooks/useToast'
import API from '@/services/api'
import { ReduxProps } from '@/storage'
import { LanguageProps } from '@/storage/modules/language/reducer'
import { MovieDetailsProps } from '@/utils/types/movieDetails'

import Lottie from 'lottie-react'
import movieLoading from '@/assets/movie-loading.json'

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
  ContentLoading,
  MovieBackgroud,
} from './styles'
import { Header } from '@/components/Header'
import { formatDate } from '@/utils/formatDate'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { colors } from '@/styles/colors'
import {
  FavoritesProps,
  setFavorites,
} from '@/storage/modules/favorites/reducer'
import { CreditsProps } from '@/utils/types/credits'
import { CarouselCredits } from '@/components/CarouselCredits'
import { MoviesProps } from '@/utils/types/movies'
import { CarouselWeb } from '@/components/CarouselWeb'
import { ContentMobile, ContentWeb } from '../Home/styles'
import { CarouselMobile } from '@/components/CarouselMobile'
import { CarouselCreditsMobile } from '@/components/CarouselCreditsMobile'
import { MoviesBlockProps } from '@/storage/modules/moviesBlock/reducer'
import { t } from 'i18next'

export function MovieDetails() {
  const { id } = useParams()

  const { moviesBlock } = useSelector<ReduxProps, MoviesBlockProps>(
    (item) => item.moviesBlock,
  )

  const { lang } = useSelector<ReduxProps, LanguageProps>(
    (item) => item.language,
  )

  const { favorites } = useSelector<ReduxProps, FavoritesProps>(
    (item) => item.favorites,
  )

  const { showToast } = useToast()

  const dispatch = useDispatch()

  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps>()
  const [credits, setCredits] = useState<CreditsProps[]>()
  const [recommendations, setRecommendations] = useState<MoviesProps[]>()

  const handleGetMovieDB = useCallback(async () => {
    await API.get(`/movie/${id}?language=${lang}`)
      .then((result) => {
        setTimeout(() => {
          setMovieDetails(result.data)
        }, 2500)
      })
      .catch(() =>
        showToast('Error while fetching details movie', {
          type: 'error',
          theme: 'colored',
        }),
      )
  }, [lang, showToast, id])

  const handleGetCreditsMovieDB = useCallback(async () => {
    setCredits([])
    await API.get(`/movie/${id}/credits?language=${lang}`)
      .then((result) => {
        setCredits(result.data.cast)
      })
      .catch(() =>
        showToast('Error while fetching credits movie', {
          type: 'error',
          theme: 'colored',
        }),
      )
  }, [lang, showToast, id])

  const handleGetRecommendationsMovieDB = useCallback(async () => {
    setRecommendations([])
    await API.get(`/movie/${id}/recommendations?language=${lang}`)
      .then((result) => {
        setRecommendations(result.data.results)
      })
      .catch(() =>
        showToast('Error while fetching recommendations movie', {
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
    handleGetCreditsMovieDB()
    handleGetMovieDB()
    handleGetRecommendationsMovieDB()
  }, [
    handleGetCreditsMovieDB,
    handleGetMovieDB,
    handleGetRecommendationsMovieDB,
  ])

  if (!movieDetails)
    return (
      <>
        <Header />
        <ContentLoading>
          <div>
            <Lottie animationData={movieLoading} loop={true} />
          </div>
        </ContentLoading>
      </>
    )

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
            <div className="info">
              <h1>{movieDetails.title}</h1>

              <ContentGenres>
                {movieDetails.genres.map((item, index) => (
                  <p key={item.id}>
                    {item.name}
                    {index + 1 !== movieDetails.genres.length && ', '}
                  </p>
                ))}
              </ContentGenres>

              <p>{formatDate(movieDetails.release_date)}</p>
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

            <h3>{t('synopsis')}</h3>
            <span>{movieDetails.overview}</span>
          </ContentInfo>
        </ContentBackground>
      </ContentHeader>
      <Container>
        {credits && credits.length > 0 && (
          <div>
            <h1>{t('credits')}</h1>

            <ContentWeb>
              <CarouselCredits credits={credits} />
            </ContentWeb>

            <ContentMobile>
              <CarouselCreditsMobile credits={credits} />
            </ContentMobile>
          </div>
        )}

        {recommendations && recommendations.length > 0 && (
          <div>
            <h1>{t('recommendations')}</h1>
            <ContentWeb>
              <CarouselWeb
                movies={recommendations.filter(
                  (item) => !moviesBlock.includes(item.id),
                )}
              />
            </ContentWeb>

            <ContentMobile>
              <CarouselMobile
                movies={recommendations.filter(
                  (item) => !moviesBlock.includes(item.id),
                )}
              />
            </ContentMobile>
          </div>
        )}
      </Container>
    </>
  )
}
