import { Container, Content } from './styles'
import { useSelector } from 'react-redux'
import { FavoritesProps } from '@/storage/modules/favorites/reducer'
import { ReduxProps } from '@/storage'
import { Title } from '../Home/styles'

import { CarouselFavorites } from '@/components/CarouselFavorites'
import { MoviesBlockProps } from '@/storage/modules/moviesBlock/reducer'
import { t } from 'i18next'
import { useCallback, useEffect, useState } from 'react'
import { MoviesProps } from '@/utils/types/movies'
import { LanguageProps } from '@/storage/modules/language/reducer'
import API from '@/services/api'
import { useToast } from '@/hooks/useToast'
import { Carousel } from '@/components/Carousel'

export function Favorites() {
  const { favorites } = useSelector<ReduxProps, FavoritesProps>(
    (item) => item.favorites,
  )
  const { moviesBlock } = useSelector<ReduxProps, MoviesBlockProps>(
    (item) => item.moviesBlock,
  )

  const { lang } = useSelector<ReduxProps, LanguageProps>(
    (item) => item.language,
  )

  const [recommendations, setRecommendations] = useState<
    MoviesProps[] | undefined
  >(undefined)

  const { showToast } = useToast()

  const handleGetRecommendationsMovieDB = useCallback(async () => {
    setRecommendations(undefined)

    const randomIndex = Math.floor(Math.random() * favorites.length)

    await API.get(
      `/movie/${favorites[randomIndex].id}/recommendations?language=${lang}`,
    )
      .then((result) => {
        setRecommendations(result.data.results)
      })
      .catch(() =>
        showToast('Error while fetching recommendations movie', {
          type: 'error',
          theme: 'colored',
        }),
      )
  }, [favorites, lang, showToast])

  useEffect(() => {
    handleGetRecommendationsMovieDB()
  }, [handleGetRecommendationsMovieDB])

  return (
    <Container>
      <Content>
        {favorites.length > 0 && (
          <div style={{ marginTop: 50 }}>
            <Title>{t('favorites')}</Title>

            <CarouselFavorites
              movies={favorites.filter(
                (item) => !moviesBlock.includes(item.id),
              )}
            />
          </div>
        )}

        {recommendations && recommendations.length > 0 && (
          <div style={{ marginTop: 50 }}>
            <Title>{t('recommendations')}</Title>

            <Carousel
              movies={recommendations.filter(
                (item) => !moviesBlock.includes(item.id),
              )}
            />
          </div>
        )}
      </Content>
    </Container>
  )
}
