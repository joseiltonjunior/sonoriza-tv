import {
  Banner,
  Carousel,
  ContentPreview,
  ImageBanner,
  InfoBanner,
} from '@/pages/Home/styles'
import { setHistoric } from '@/storage/modules/historic/reducer'
import { formatDate } from '@/utils/formatDate'
import { MoviesProps } from '@/utils/types/movies'
import { useKeenSlider } from 'keen-slider/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

interface CarouselProps {
  movies: MoviesProps[]
}

export function CarouselWeb({ movies }: CarouselProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 6,
      spacing: 16,
    },
  })

  const [isFocus, setIsFocus] = useState<number | undefined>()

  const dispatch = useDispatch()

  return (
    <Carousel ref={sliderRef} className="ken-slider">
      {movies.map((item) => (
        <div key={item.id}>
          {item.poster_path && (
            <Banner className="keen-slider__slide">
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
                  <Link
                    to={`/movie/${item.id}`}
                    onClick={() => dispatch(setHistoric(item))}
                  >
                    Ver mais
                  </Link>
                </ContentPreview>
              </ImageBanner>
              <InfoBanner>
                <p>{item.title}</p>
                <span>{formatDate(item.release_date)}</span>
              </InfoBanner>
            </Banner>
          )}
        </div>
      ))}
    </Carousel>
  )
}
