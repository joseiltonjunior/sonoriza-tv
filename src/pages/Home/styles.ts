import { colors } from '@/styles/colors'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { shade } from 'polished'

export const Content = styled.div`
  max-width: calc(100vw - ((100vw - 1180px) / 2));
  margin: 0 auto;
  width: 100%;
  margin-top: 2rem;

  @media (max-width: 900px) {
    padding-left: 1rem;
  }
`

export const Container = styled.div`
  height: 100%;
  padding-top: 70px;
`
export const Carousel = styled.div`
  display: flex;
  overflow: hidden;
`
export const Banner = styled.div`
  img {
    height: 300px;
    width: 100%;
    border-radius: 4px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  align-items: center;
  justify-content: center;

  background-color: transparent;

  color: ${colors.Light};

  position: relative;
  overflow: hidden;
`
export const ContentPreview = styled(motion.div)`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.9);
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  padding: 12px 6px;

  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 8;
    margin: 0 6px;
    color: ${colors.Light};
  }

  button.viewMore {
    background-color: ${colors.Primary};
    border: none;
    color: ${colors.Light};
    border-radius: 4px;
    font-weight: bold;
    text-decoration: none;
    text-align: center;

    width: 100%;
    padding: 2px 0;

    cursor: pointer;

    transition: all 0.2s;

    &:hover {
      background-color: ${shade(0.2, colors.Primary)};
    }
  }

  button.remove {
    background-color: ${colors.Red_500};
    border: none;
    color: ${colors.Light};
    border-radius: 4px;
    font-weight: bold;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    width: 100%;

    padding: 2px 0;

    transition: all 0.2s;

    &:hover {
      background-color: ${shade(0.2, colors.Red_500)};
    }
  }

  div {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }
`

export const ContentWeb = styled.div`
  display: none;

  @media (min-width: 900px) {
    display: block;
  }
`

export const ContentMobile = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`
export const ImageBanner = styled.div`
  position: relative;
`
export const InfoBanner = styled.div`
  margin-top: 8px;
  color: ${(props) => props.theme.font};

  p {
    font-weight: bold;
  }

  span {
    font-size: 14px;
  }
`

export const Title = styled.p`
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1.2rem;
`
export const SearchContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 4rem 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding-right: 1rem;
  }
`
