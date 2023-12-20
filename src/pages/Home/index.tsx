import { Header } from '@/components/Header'
import { ReduxProps } from '@/storage'

import { useSelector } from 'react-redux'
import { Container, ContentMobile, ContentWeb, Title } from './styles'
import { useCallback, useEffect, useState } from 'react'
import API from '@/services/api'
// import { ProfileProps } from '@/storage/modules/profile/reducer'
import { LanguageProps } from '@/storage/modules/language/reducer'
import { MoviesProps } from '@/utils/types/movies'

import { useToast } from '@/hooks/useToast'
import { CarouselWeb } from '@/components/CarouselWeb'
import { CarouselMobile } from '@/components/CarouselMobile'
import { HistoricProps } from '@/storage/modules/historic/reducer'
import { FavoritesProps } from '@/storage/modules/favorites/reducer'
import { CarouselFavoritesWeb } from '@/components/CarouselFavoritesWeb'
import { CarouselFavoritesMobile } from '@/components/CarouselFavoritesMobile'
import { PopularMovies } from '@/components/PopularMovies'

export function Home() {
  //   const { profile } = useSelector<ReduxProps, ProfileProps>(
  //     (item) => item.profile,
  //   )

  const { lang } = useSelector<ReduxProps, LanguageProps>(
    (item) => item.language,
  )

  const { historic } = useSelector<ReduxProps, HistoricProps>(
    (item) => item.historic,
  )

  const { favorites } = useSelector<ReduxProps, FavoritesProps>(
    (item) => item.favorites,
  )

  const [popularMovies, setPopularMovies] = useState<MoviesProps[]>()
  const [topRatedMovies, setTopRatedMovies] = useState<MoviesProps[]>()

  const { showToast } = useToast()

  //   const handleGetMoviesDB = useCallback(async () => {
  //     await API.get(
  //       `/discover/movie?include_adult=${
  //         profile === 'normal' ? 'true' : 'false'
  //       }&include_video=true&language=${lang}&page=1&sort_by=popularity.desc`,
  //     )
  //       .then((result) => {
  //         setDiscoverMovies(result.data.results)
  //       })
  //       .catch(() =>
  //         showToast('Error while fetching movies', {
  //           type: 'error',
  //           theme: 'colored',
  //         }),
  //       )
  //   }, [lang, profile, showToast])

  const handleGetTopRatedMoviesDB = useCallback(async () => {
    await API.get(`/movie/top_rated?language=${lang}&page=1`)
      .then((result) => {
        setTopRatedMovies(result.data.results)
      })
      .catch(() =>
        showToast('Error while fetching movies', {
          type: 'error',
          theme: 'colored',
        }),
      )
  }, [lang, showToast])

  const handleGetPopularMoviesDB = useCallback(async () => {
    await API.get(`/movie/popular?language=${lang}&page=1`)
      .then((result) => {
        setPopularMovies(result.data.results)
      })
      .catch(() =>
        showToast('Error while fetching movies', {
          type: 'error',
          theme: 'colored',
        }),
      )
  }, [lang, showToast])

  useEffect(() => {
    handleGetPopularMoviesDB()
    handleGetTopRatedMoviesDB()
  }, [handleGetTopRatedMoviesDB, handleGetPopularMoviesDB])

  return (
    <>
      <Header />

      {popularMovies && <PopularMovies movies={popularMovies} />}

      <Container>
        {historic.length > 0 && (
          <>
            <Title>Vistos recentemente</Title>
            <ContentWeb>
              <CarouselWeb movies={historic} />
            </ContentWeb>

            <ContentMobile>
              <CarouselMobile movies={historic} />
            </ContentMobile>
          </>
        )}

        {favorites.length > 0 && (
          <div style={{ marginTop: 50 }}>
            <Title>Favoritos</Title>
            <ContentWeb>
              <CarouselFavoritesWeb movies={favorites} />
            </ContentWeb>

            <ContentMobile>
              <CarouselFavoritesMobile movies={favorites} />
            </ContentMobile>
          </div>
        )}

        {topRatedMovies && (
          <div style={{ marginTop: 50 }}>
            <Title>Mais votados</Title>
            <ContentWeb>
              <CarouselWeb movies={topRatedMovies} />
            </ContentWeb>

            <ContentMobile>
              <CarouselMobile movies={topRatedMovies} />
            </ContentMobile>
          </div>
        )}
      </Container>
    </>
  )
}
