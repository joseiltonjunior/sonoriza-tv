import {
  Banner,
  CarouselContent,
  ImageBanner,
  InfoBanner,
} from '@/pages/Home/styles'

import { CreditsProps } from '@/utils/types/credits'

import { useKeenSlider } from 'keen-slider/react'
import { useEffect, useState } from 'react'

interface CarouselProps {
  credits: CreditsProps[]
}

export function CarouselCredits({ credits }: CarouselProps) {
  const [perView, setPerView] = useState(6)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView,
      spacing: 16,
    },
  })

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
      {credits.map((item) => (
        <div key={item.id}>
          {item.profile_path && (
            <Banner className="keen-slider__slide">
              <ImageBanner>
                {item.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${item.profile_path}`}
                    alt="poster"
                  />
                )}
              </ImageBanner>
              <InfoBanner>
                <p>{item.name}</p>
              </InfoBanner>
            </Banner>
          )}
        </div>
      ))}
    </CarouselContent>
  )
}
