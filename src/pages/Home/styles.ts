import styled from 'styled-components'

export const Container = styled.div`
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 900px) {
    display: 1rem;
  }
`
export const Carousel = styled.div`
  display: flex;
  overflow: hidden;
`
export const Banner = styled.div`
  img {
    height: 300px;
    border-radius: 4px;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-top: 8px;

    p {
      font-weight: bold;
    }

    span {
      font-size: 14px;
    }
  }

  align-items: center;
  justify-content: center;
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
