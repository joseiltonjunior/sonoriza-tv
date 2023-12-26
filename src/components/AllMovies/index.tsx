import { MoviesProps } from '@/utils/types/movies'
import {
  Aside,
  Button,
  Container,
  Content,
  ContentGenres,
  ContentOrder,
  TagGenre,
  ViewMore,
} from './styles'
import {
  Banner,
  ContentPreview,
  ImageBanner,
  InfoBanner,
} from '@/pages/Home/styles'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '@/utils/formatDate'
import { setBlockList } from '@/storage/modules/moviesBlock/reducer'
import { setHistoric } from '@/storage/modules/historic/reducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Select } from '../Select'
import { MdArrowDropDown, MdArrowRight } from 'react-icons/md'
import { MovieGenreProps } from '@/utils/types/movieGenres'
import API from '@/services/api'
import { useToast } from '@/hooks/useToast'
import { ReduxProps } from '@/storage'
import { LanguageProps } from '@/storage/modules/language/reducer'
import { GenreProps, setGenre } from '@/storage/modules/genre/reducer'
import { t } from 'i18next'

interface AllMoviesProps {
  allMovies: MoviesProps[]

  orderBy: string
  setOrderBy: Dispatch<SetStateAction<string>>
  moreItens: () => void
}

const optionsSort = [
  { label: 'Popularidade (maior)', value: 'popularity.desc' },
  { label: 'Popularidade (menor)', value: 'popularity.asc' },
  {
    label: 'Lançamento (novo)',
    value: 'primary_release_date.desc',
  },
  {
    label: 'Lançamento (velho)',
    value: 'primary_release_date.asc',
  },
  {
    label: 'Avaliação (melhor)',
    value: 'vote_average.desc',
  },
  {
    label: 'Avaliação (pior)',
    value: 'vote_average.asc',
  },
]

export function AllMovies({
  allMovies,
  orderBy,
  moreItens,
  setOrderBy,
}: AllMoviesProps) {
  const [isFocus, setIsFocus] = useState<number | undefined>()
  const [isOrder, setIsOrder] = useState(false)
  const [isFilter, setIsFilter] = useState(false)
  const [movieGenres, setMovieGenres] = useState<MovieGenreProps[]>([])

  const { genre } = useSelector<ReduxProps, GenreProps>((item) => item.genre)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { showToast } = useToast()

  const { lang } = useSelector<ReduxProps, LanguageProps>(
    (item) => item.language,
  )

  const handleGetMovieGenresDB = useCallback(async () => {
    await API.get(`/genre/movie/list?language=${lang}'`)
      .then((result) => {
        setMovieGenres(result.data.genres)
      })
      .catch(() =>
        showToast('Error while search items', {
          type: 'error',
          theme: 'colored',
        }),
      )
  }, [lang, showToast])

  useEffect(() => {
    handleGetMovieGenresDB()
  }, [handleGetMovieGenresDB])

  return (
    <Container>
      <h1>{t('popularMovies')}</h1>
      <div className="content">
        <Aside>
          <ContentOrder>
            <Button onClick={() => setIsOrder(!isOrder)}>
              <p>{t('order')}</p>
              {isOrder ? (
                <MdArrowRight size={20} />
              ) : (
                <MdArrowDropDown size={20} />
              )}
            </Button>
            {isOrder && (
              <div>
                <Select
                  label={t('orderInfo')}
                  options={optionsSort}
                  placeholder="choose a item"
                  value={orderBy}
                  onChange={(e) => {
                    setOrderBy(e.currentTarget.value)
                  }}
                />
              </div>
            )}
          </ContentOrder>

          <div className="filter">
            <Button onClick={() => setIsFilter(!isFilter)}>
              <p>{t('filter')}</p>
              {isFilter ? (
                <MdArrowRight size={20} />
              ) : (
                <MdArrowDropDown size={20} />
              )}
            </Button>
            {isFilter && (
              <div>
                {movieGenres && (
                  <ContentGenres>
                    <p>{t('genres')}</p>

                    <div>
                      {movieGenres.map((item) => (
                        <TagGenre
                          $isCheck={genre === item.id}
                          key={item.id}
                          onClick={() => {
                            if (item.id === genre) {
                              dispatch(setGenre({ genre: null }))
                            } else {
                              dispatch(setGenre({ genre: item.id }))
                            }
                          }}
                        >
                          <p>{item.name}</p>
                        </TagGenre>
                      ))}
                    </div>
                  </ContentGenres>
                )}
              </div>
            )}
          </div>
        </Aside>
        <Content>
          <div className="grid">
            {allMovies
              ?.filter((item) => item.backdrop_path)
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
                      initial={{ opacity: 0 }}
                      animate={{
                        y: isFocus === item.id && item.overview ? 0 : -30,
                        opacity: isFocus === item.id && item.overview ? 1 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <p>{item.overview}</p>
                      <div>
                        <button
                          className="remove"
                          onClick={() => dispatch(setBlockList(item.id))}
                        >
                          Não exibir
                        </button>
                        <button
                          className="viewMore"
                          onClick={() => {
                            navigate(`/movie/${item.id}`)
                            dispatch(setHistoric(item))
                          }}
                        >
                          Ver mais
                        </button>
                      </div>
                    </ContentPreview>
                  </ImageBanner>
                  <InfoBanner>
                    <p>{item.title}</p>
                    <span>{formatDate(item.release_date)}</span>
                  </InfoBanner>
                </Banner>
              ))}
          </div>
          <div className="moreButton">
            <ViewMore onClick={moreItens}>Carregar mais</ViewMore>
          </div>
        </Content>
      </div>
    </Container>
  )
}
