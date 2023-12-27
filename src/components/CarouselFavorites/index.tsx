import {
  Banner,
  CarouselContent,
  ContentPreview,
  ImageBanner,
  InfoBanner,
} from '@/pages/Home/styles'
import { setBlockList } from '@/storage/modules/moviesBlock/reducer'

import { formatDate } from '@/utils/formatDate'
import { MovieDetailsProps } from '@/utils/types/movieDetails'

import { useKeenSlider } from 'keen-slider/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

interface CarouselProps {
  movies: MovieDetailsProps[]
}

export function CarouselFavorites({ movies }: CarouselProps) {
  const [perView, setPerView] = useState(6)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView,
      spacing: 16,
    },
  })

  const [isFocus, setIsFocus] = useState<number | undefined>(undefined)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth

      if (screenWidth < 1250 && screenWidth > 1100) {
        setPerView(5)
      } else if (screenWidth < 1100 && screenWidth > 900) {
        setPerView(4)
      } else if (screenWidth < 900 && screenWidth > 700) {
        setPerView(3.5)
      } else if (screenWidth < 700 && screenWidth > 500) {
        setPerView(2.5)
      } else if (screenWidth < 500) {
        setPerView(1.5)
      } else {
        setPerView(6)
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <CarouselContent ref={sliderRef} className="ken-slider">
      {movies.map((item) => (
        <Banner key={item.id} className="keen-slider__slide">
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
                  onClick={() => navigate(`/movie/${item.id}`)}
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
    </CarouselContent>
  )
}
