import { MoviesProps } from '@/utils/types/movies'
import { useKeenSlider } from 'keen-slider/react'
import { Container, ContentInfo } from './styles'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { t } from 'i18next'

interface PopularMoviesProps {
  movies: MoviesProps[]
}

export function PopularMovies({ movies }: PopularMoviesProps) {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
    },
  })

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next()
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [instanceRef])

  return (
    <Container ref={sliderRef} className="ken-slider">
      {movies.map((item) => (
        <div key={item.id} className="keen-slider__slide">
          {item.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              alt="backdrop"
            />
          )}
          <ContentInfo>
            <h1>{item.title}</h1>

            <p>{item.overview}</p>

            <Link to={`/movie/${item.id}`}>{t('viewMore')}</Link>
          </ContentInfo>
        </div>
      ))}
    </Container>
  )
}
