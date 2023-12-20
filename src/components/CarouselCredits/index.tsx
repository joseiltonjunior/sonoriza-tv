import { Banner, Carousel, ImageBanner, InfoBanner } from '@/pages/Home/styles'

import { CreditsProps } from '@/utils/types/credits'

import { useKeenSlider } from 'keen-slider/react'

interface CarouselProps {
  credits: CreditsProps[]
}

export function CarouselCredits({ credits }: CarouselProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 6,
      spacing: 16,
    },
  })

  return (
    <Carousel ref={sliderRef} className="ken-slider">
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
    </Carousel>
  )
}
