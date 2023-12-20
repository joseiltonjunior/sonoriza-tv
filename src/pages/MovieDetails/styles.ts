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

export const ContentHeader = styled.div`
  position: relative;
  height: 40rem;

  width: 100%;

  @media (max-width: 900px) {
    height: auto;
  }
`

export const MovieBackgroud = styled.img`
  height: 100%;
  width: 100%;

  opacity: ${(props) => props.theme.opacity};
`
export const ContentBackground = styled.div`
  position: absolute;

  height: 100%;
  width: 100%;

  z-index: 1000;
  top: 0;

  padding: 0 19rem;
  display: flex;
  align-items: center;
  gap: 2rem;

  img {
    height: auto;
    width: 300px;
    border-radius: 4px;
  }

  @media (max-width: 1366px) {
    padding: 0 6rem;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 0 2rem;
    margin-top: 2rem;

    img {
      width: 250px;
    }
  }
`
export const ContentInfo = styled.div`
  div {
    display: flex;
    align-items: center;
  }

  h4 {
    font-weight: 500;
    margin: 1rem 0;
  }

  h3 {
    margin-bottom: 0.5rem;
  }
`

export const ContentGenres = styled.div`
  gap: 4px;
  display: flex;
  margin-left: 1rem;
`
