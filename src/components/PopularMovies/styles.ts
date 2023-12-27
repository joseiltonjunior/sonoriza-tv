import { colors } from '@/styles/colors'
import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  display: flex;
  overflow: hidden;
  margin-bottom: -12rem;

  div {
    position: relative;
    width: 100%;
    height: 50rem;

    img {
      width: 100%;

      object-fit: cover;
      opacity: 0.3;
      position: absolute;
    }

    @media (max-width: 900px) {
      height: auto;
      margin-bottom: 8rem;
    }
  }
`
export const ContentInfo = styled.div`
  margin: 0 auto;
  max-width: calc(100vw - ((100vw - 1180px) / 2));

  display: flex;
  flex-direction: column;

  justify-content: center;

  @media (max-width: 1250px) {
    padding: 0 1rem;
  }

  h1 {
    font-size: 5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 1;
  }

  p {
    margin-top: 1rem;
    font-weight: 500;
  }

  button {
    background-color: ${colors.Primary};

    border-radius: 20px;
    padding: 0.5rem 1rem;
    font-weight: bold;
    color: ${colors.Light};
    width: fit-content;
    border: none;
    cursor: pointer;

    margin-top: 2rem;

    transition: all 0.2s;

    &:hover {
      background-color: ${shade(0.2, colors.Primary)};
    }
  }

  @media (max-width: 900px) {
    h1 {
      font-size: 2rem;
      margin-top: 4rem;
    }

    p {
      display: none;
    }

    padding: 0 1rem;
    width: 100%;
    height: 100vh;
  }
`
