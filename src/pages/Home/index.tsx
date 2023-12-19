import { Header } from '@/components/Header'
import { ReduxProps } from '@/storage'
import { useKeenSlider } from 'keen-slider/react'
import { useSelector } from 'react-redux'
import { Banner, Carousel, Container } from './styles'
import { useCallback, useEffect, useState } from 'react'
import API from '@/services/api'
import { ProfileProps } from '@/storage/modules/profile/reducer'
import { LanguageProps } from '@/storage/modules/language/reducer'
import { MoviesProps } from '@/utils/types/movies'

import { formatDate } from '@/utils/formatDate'

export function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 5,
      spacing: 16,
    },
  })

  const { profile } = useSelector<ReduxProps, ProfileProps>(
    (item) => item.profile,
  )

  const { lang } = useSelector<ReduxProps, LanguageProps>(
    (item) => item.language,
  )

  //   const [order, setOrder] = useState('')

  const [popularMovies, setPopularMovies] = useState<MoviesProps[]>()

  const handleGetMoviesDB = useCallback(async () => {
    await API.get(
      `/discover/movie?include_adult=${
        profile === 'normal' ? 'true' : 'false'
      }&include_video=true&language=${lang}&page=1&sort_by=popularity.desc`,
    )
      .then((result) => {
        setPopularMovies(result.data.results)
      })
      .catch((err) => console.log(err, 'err'))
  }, [lang, profile])

  useEffect(() => {
    handleGetMoviesDB()
  }, [handleGetMoviesDB])

  return (
    <>
      <Header />
      <Container>
        {popularMovies && (
          <>
            <div>
              <h2>Têndencias</h2>
            </div>
            <Carousel ref={sliderRef} className="ken-slider">
              {popularMovies.map((item) => (
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
          </>
        )}
      </Container>
    </>
  )
}
