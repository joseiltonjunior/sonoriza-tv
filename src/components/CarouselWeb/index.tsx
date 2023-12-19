import { Banner, Carousel } from '@/pages/Home/styles'
import { formatDate } from '@/utils/formatDate'
import { MoviesProps } from '@/utils/types/movies'
import { useKeenSlider } from 'keen-slider/react'

interface CarouselProps {
  movies: MoviesProps[]
}

export function CarouselWeb({ movies }: CarouselProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 5,
      spacing: 16,
    },
  })

  return (
    <Carousel ref={sliderRef} className="ken-slider">
      {movies.map((item) => (
        <Banner key={item.id} className="keen-slider__slide">
          <img
            src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
            alt="poster"
          />
          <div>
            <p>{item.title}</p>
            <span>{formatDate(item.release_date)}</span>
          </div>
        </Banner>
      ))}
    </Carousel>
  )
}
