import {
  Banner,
  ButtonPreview,
  ContentPreview,
  ImageBanner,
  InfoBanner,
  SearchContent,
} from '@/pages/Home/styles'
import { ReduxProps } from '@/storage'
import { setHistoric } from '@/storage/modules/historic/reducer'
import {
  MoviesBlockProps,
  setBlockList,
} from '@/storage/modules/moviesBlock/reducer'
import { formatDate } from '@/utils/formatDate'
import { MoviesProps } from '@/utils/types/movies'
import { PersonProps } from '@/utils/types/person'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

interface SearchResultsProps {
  searchList?: MoviesProps[]
  personList?: PersonProps[]
}

export function SearchResults({ searchList, personList }: SearchResultsProps) {
  const [isFocus, setIsFocus] = useState<number | undefined>(undefined)

  const { moviesBlock } = useSelector<ReduxProps, MoviesBlockProps>(
    (item) => item.moviesBlock,
  )

  const dispatch = useDispatch()

  return (
    <SearchContent>
      {personList
        ?.filter((item) => item.profile_path)
        .filter((item) => !moviesBlock.includes(item.id))
        .map((item) => (
          <Banner key={item.id}>
            <ImageBanner>
              <img
                src={`https://image.tmdb.org/t/p/w300${item.profile_path}`}
                alt="poster"
              />
            </ImageBanner>
            <InfoBanner>
              <p>{item.name}</p>
            </InfoBanner>
          </Banner>
        ))}
      {searchList
        ?.filter((item) => item.poster_path)
        .filter((item) => !moviesBlock.includes(item.id))
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
  )
}
