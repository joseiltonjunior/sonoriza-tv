import {
  Banner,
  Carousel,
  ContentPreview,
  ImageBanner,
  InfoBanner,
} from '@/pages/Home/styles'

import { formatDate } from '@/utils/formatDate'
import { MovieDetailsProps } from '@/utils/types/movieDetails'

import { useKeenSlider } from 'keen-slider/react'
import { useState } from 'react'

import { Link } from 'react-router-dom'

interface CarouselProps {
  movies: MovieDetailsProps[]
}

export function CarouselFavoritesWeb({ movies }: CarouselProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 6,
      spacing: 16,
    },
  })

  const [isFocus, setIsFocus] = useState<number | undefined>()

  return (
    <Carousel ref={sliderRef} className="ken-slider">
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
              animate={{
                y: isFocus === item.id && item.overview ? 0 : 30,
                opacity: isFocus === item.id && item.overview ? 1 : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              <p>{item.overview}</p>
              <Link to={`/movie/${item.id}`}>Ver mais</Link>
            </ContentPreview>
          </ImageBanner>
          <InfoBanner>
            <p>{item.title}</p>
            <span>{formatDate(item.release_date)}</span>
          </InfoBanner>
        </Banner>
      ))}
    </Carousel>
  )
}
