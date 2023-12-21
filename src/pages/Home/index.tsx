import { Header } from '@/components/Header'
import { ReduxProps } from '@/storage'

import { useSelector } from 'react-redux'
import { Container, Content, ContentMobile, ContentWeb, Title } from './styles'
import { useCallback, useEffect, useState } from 'react'
import API from '@/services/api'

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
import { MoviesBlockProps } from '@/storage/modules/moviesBlock/reducer'

import { SearchProps } from '@/storage/modules/search/reducer'

import { t } from 'i18next'
import { AllMovies } from '@/components/AllMovies'
import { ProfileProps } from '@/storage/modules/profile/reducer'
import { SearchResults } from '@/components/SearchResults'
import { GenreProps } from '@/storage/modules/genre/reducer'
import { PersonProps } from '@/utils/types/person'

export function Home() {
  const { lang } = useSelector<ReduxProps, LanguageProps>(
    (item) => item.language,
  )

  const { profile } = useSelector<ReduxProps, ProfileProps>(
    (item) => item.profile,
  )

  const { genre } = useSelector<ReduxProps, GenreProps>((item) => item.genre)

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
  const [personList, setPersonList] = useState<PersonProps[] | undefined>()
  const [topRatedMovies, setTopRatedMovies] = useState<MoviesProps[]>()
  const [allMovies, setAllMovies] = useState<MoviesProps[]>([])
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<string>('popularity.desc')
  const [isMoreItens, setIsMoreItens] = useState(false)

  const { showToast } = useToast()

  const emptySerch = !searchList && !personList

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

  const handleSearchPersonDB = useCallback(async () => {
    if (filter.length < 2) return setPersonList(undefined)
    await API.get(`/search/person?query=${filter}`)
      .then((result) => {
        setPersonList(result.data.results)
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
    await API.get(
      `/discover/movie?include_adult=${
        profile === 'normal' ? 'true' : 'false'
      }&language=${lang}`,
    )
      .then((result) => {
        setPopularMovies(result.data.results)
      })
      .catch(() =>
        showToast('Error while fetching movies', {
          type: 'error',
          theme: 'colored',
        }),
      )
  }, [lang, profile, showToast])

  const handleMoreItems = () => {
    setIsMoreItens(true)
    setPage((prev) => prev + 1)
  }

  const handleGetAllMoviesDB = useCallback(async () => {
    await API.get(
      `/discover/movie?include_adult=${
        profile === 'normal' ? 'true' : 'false'
      }&language=${lang}&page=${page}&sort_by=${sortBy}${
        genre ? `&with_genres=${genre}` : ''
      }`,
    )
      .then((result) => {
        if (isMoreItens) {
          setAllMovies((prev) => [...prev, ...result.data.results])
          setIsMoreItens(false)

          return
        }

        setAllMovies(result.data.results)
      })
      .catch(() =>
        showToast('Error while fetching movies', {
          type: 'error',
          theme: 'colored',
        }),
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, page, profile, showToast, sortBy, genre])

  useEffect(() => {
    handleGetPopularMoviesDB()
    handleGetTopRatedMoviesDB()
  }, [handleGetTopRatedMoviesDB, handleGetPopularMoviesDB])

  useEffect(() => {
    handleGetAllMoviesDB()
  }, [handleGetAllMoviesDB])

  useEffect(() => {
    if (filter.length > 0) {
      handleSearchDB()
      handleSearchPersonDB()
    } else {
      setSearchList(undefined)
      setPersonList(undefined)
    }
  }, [filter, handleSearchDB, handleSearchPersonDB])

  return (
    <>
      <Header isHome />

      <Container>
        {popularMovies && emptySerch && (
          <PopularMovies
            movies={popularMovies.filter(
              (item) => !moviesBlock.includes(item.id),
            )}
          />
        )}
        <Content>
          <SearchResults searchList={searchList} personList={personList} />

          {historic.length > 0 && emptySerch && (
            <>
              <Title>{t('historic')}</Title>
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

          {favorites.length > 0 && emptySerch && (
            <div style={{ marginTop: 50 }}>
              <Title>{t('favorites')}</Title>
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

          {topRatedMovies && emptySerch && (
            <div style={{ marginTop: 50 }}>
              <Title>{t('topRated')}</Title>
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

          {allMovies && emptySerch && (
            <AllMovies
              moreItens={handleMoreItems}
              orderBy={sortBy}
              setOrderBy={setSortBy}
              allMovies={allMovies.filter(
                (item) => !moviesBlock.includes(item.id),
              )}
            />
          )}
        </Content>
      </Container>
    </>
  )
}
