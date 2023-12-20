import { colors } from '@/styles/colors'
import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 900px) {
    display: 1rem;
  }
`

export const ContentHeader = styled.div`
  position: relative;
  height: 52rem;

  width: 100%;

  display: flex;
  justify-content: center;

  @media (max-width: 900px) {
    height: auto;
  }
`

export const MovieBackgroud = styled.img`
  height: 100%;
  width: 100%;

  padding-top: 70px;

  opacity: ${(props) => props.theme.opacity};
`
export const ContentBackground = styled.div`
  position: absolute;

  height: 100%;
  width: 100%;

  z-index: 100;
  top: 0;

  max-width: calc(100vw - ((100vw - 1180px) / 2));
  margin: 0 auto;

  display: flex;
  align-items: center;
  gap: 2rem;

  img {
    height: auto;
    width: 300px;
    border-radius: 4px;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 0 1rem;
    margin-top: 8rem;

    img {
      width: 250px;
    }
  }
`
export const ContentInfo = styled.div`
  h4 {
    font-weight: 500;
    margin: 1rem 0;
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  button:hover {
    background-color: ${shade(0.2, colors.Primary)};
  }
`

export const ContentGenres = styled.div`
  gap: 4px;
  display: flex;
  margin-left: 1rem;
`
export const RowContent = styled.div`
  display: flex;
  align-items: center;
`

export const AddFavorite = styled.button`
  background-color: ${colors.Primary};
  border-radius: 50%;
  border: none;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 1rem;

  cursor: pointer;
  transition: all 0.2s;
`
