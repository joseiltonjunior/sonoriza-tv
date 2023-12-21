import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  padding-top: 70px;
`
export const Content = styled.div`
  max-width: calc(100vw - ((100vw - 1180px) / 2));
  margin: 0 auto;
  width: 100%;
  margin-top: 2rem;

  @media (max-width: 900px) {
    padding-left: 1rem;
  }
`
