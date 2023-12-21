import { Header } from '@/components/Header'
import { ReduxProps } from '@/storage'

import { useDispatch, useSelector } from 'react-redux'
import {
  Banner,
  ButtonPreview,
  Container,
  Content,
  ContentMobile,
  ContentPreview,
  ContentWeb,
  ImageBanner,
  InfoBanner,
  SearchContent,
  Title,
} from './styles'
import { useCallback, useEffect, useState } from 'react'
import API from '@/services/api'
// import { ProfileProps } from '@/storage/modules/profile/reducer'
import { LanguageProps } from '@/storage/modules/language/reducer'
import { MoviesProps } from '@/utils/types/movies'

import { useToast } from '@/hooks/useToast'
import { CarouselWeb } from '@/components/CarouselWeb'
import { CarouselMobile } from '@/components/CarouselMobile'
import { HistoricProps, setHistoric } from '@/storage/modules/historic/reducer'
import { FavoritesProps } from '@/storage/modules/favorites/reducer'
import { CarouselFavoritesWeb } from '@/components/CarouselFavoritesWeb'
import { CarouselFavoritesMobile } from '@/components/CarouselFavoritesMobile'
import { PopularMovies } from '@/components/PopularMovies'
import {
  MoviesBlockProps,
  setBlockList,
} from '@/storage/modules/moviesBlock/reducer'

import { SearchProps } from '@/storage/modules/search/reducer'
import { Link } from 'react-router-dom'
import { formatDate } from '@/utils/formatDate'

export function Home() {
  const [isFocus, setIsFocus] = useState<number | undefined>()

  const dispatch = useDispatch()

  const { lang } = useSelector<ReduxProps, LanguageProps>(
    (item) => item.language,
  )

  const { filter } = useSelector<ReduxProps, SearchProps>((item) => item.search)

  const { moviesBlock } = useSelector<ReduxProps, MoviesBlockProps>(
    (item) => item.moviesBlock,
  )

  const { historic } = useSelector<ReduxProps, HistoricProps>(
    (item) => item.historic,
  )

  const { favorites } = useSelector<ReduxProps, FavoritesProps>(
    (item) => item.favorites,
  )

  const [popularMovies, setPopularMovies] = useState<MoviesProps[]>()
  const [searchList, setSearchList] = useState<MoviesProps[] | undefined>()
  const [topRatedMovies, setTopRatedMovies] = useState<MoviesProps[]>()

  const { showToast } = useToast()

  const handleSearchDB = useCallback(async () => {
    if (filter.length < 2) return setSearchList(undefined)
    await API.get(`/search/movie?query=${filter}`)
      .then((result) => {
        setSearchList(result.data.results)
      })
      .catch(() =>
        showToast('Error while search items', {
          type: 'error',
          theme: 'colored',
        }),
      )
  }, [filter, showToast])

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

  useEffect(() => {
    if (filter.length > 0) {
      handleSearchDB()
    } else {
      setSearchList(undefined)
    }
  }, [filter, handleSearchDB])

  return (
    <>
      <Header isHome />

      <Container>
        {popularMovies && !searchList && (
          <PopularMovies
            movies={popularMovies.filter(
              (item) => !moviesBlock.includes(item.id),
            )}
          />
        )}
        <Content>
          {searchList && (
            <SearchContent>
              {searchList
                .filter((item) => item.poster_path)
                .map((item) => (
                  <Banner key={item.id}>
                    <ImageBanner
                      onMouseEnter={() => setIsFocus(item.id)}
                      onMouseLeave={() => setIsFocus(undefined)}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                        alt="poster"
                      />

                      <ContentPreview
                        animate={{
                          y: isFocus === item.id && item.overview ? 0 : -30,
                          opacity: isFocus === item.id && item.overview ? 1 : 0,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <p>{item.overview}</p>
                        <div>
                          <ButtonPreview
                            $variant="remove"
                            onClick={() => dispatch(setBlockList(item.id))}
                          >
                            Não exibir
                          </ButtonPreview>
                          <Link
                            to={`/movie/${item.id}`}
                            onClick={() => dispatch(setHistoric(item))}
                          >
                            Ver mais
                          </Link>
                        </div>
                      </ContentPreview>
                    </ImageBanner>
                    <InfoBanner>
                      <p>{item.title}</p>
                      <span>{formatDate(item.release_date)}</span>
                    </InfoBanner>
                  </Banner>
                ))}
            </SearchContent>
          )}

          {historic.length > 0 && !searchList && (
            <>
              <Title>Vistos recentemente</Title>
              <ContentWeb>
                <CarouselWeb
                  movies={historic.filter(
                    (item) => !moviesBlock.includes(item.id),
                  )}
                />
              </ContentWeb>

              <ContentMobile>
                <CarouselMobile
                  movies={historic.filter(
                    (item) => !moviesBlock.includes(item.id),
                  )}
                />
              </ContentMobile>
            </>
          )}

          {favorites.length > 0 && !searchList && (
            <div style={{ marginTop: 50 }}>
              <Title>Favoritos</Title>
              <ContentWeb>
                <CarouselFavoritesWeb
                  movies={favorites.filter(
                    (item) => !moviesBlock.includes(item.id),
                  )}
                />
              </ContentWeb>

              <ContentMobile>
                <CarouselFavoritesMobile
                  movies={favorites.filter(
                    (item) => !moviesBlock.includes(item.id),
                  )}
                />
              </ContentMobile>
            </div>
          )}

          {topRatedMovies && !searchList && (
            <div style={{ marginTop: 50 }}>
              <Title>Mais votados</Title>
              <ContentWeb>
                <CarouselWeb
                  movies={topRatedMovies.filter(
                    (item) => !moviesBlock.includes(item.id),
                  )}
                />
              </ContentWeb>

              <ContentMobile>
                <CarouselMobile
                  movies={topRatedMovies.filter(
                    (item) => !moviesBlock.includes(item.id),
                  )}
                />
              </ContentMobile>
            </div>
          )}
        </Content>
      </Container>
    </>
  )
}
