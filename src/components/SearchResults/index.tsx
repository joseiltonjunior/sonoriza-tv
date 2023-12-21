import {
  Banner,
  ButtonPreview,
  ContentPreview,
  ImageBanner,
  InfoBanner,
  SearchContent,
} from '@/pages/Home/styles'
import { setHistoric } from '@/storage/modules/historic/reducer'
import { setBlockList } from '@/storage/modules/moviesBlock/reducer'
import { formatDate } from '@/utils/formatDate'
import { MoviesProps } from '@/utils/types/movies'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

interface SearchResultsProps {
  searchList: MoviesProps[]
}

export function SearchResults({ searchList }: SearchResultsProps) {
  const [isFocus, setIsFocus] = useState<number | undefined>()

  const dispatch = useDispatch()

  return (
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
  )
}
