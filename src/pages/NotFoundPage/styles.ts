import { colors } from '@/styles/colors'
import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    max-width: 400px;

    @media (max-width: 900px) {
      max-width: 250px;
    }
  }

  div {
    height: fit-content;
    width: fit-content;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      font-size: 20px;
    }

    a {
      width: 100%;
      background-color: ${colors.Primary};
      text-align: center;
      border-radius: 4px;
      padding: 8px 0;
      color: ${colors.Light};
      font-weight: bold;

      margin-top: 2rem;
      text-decoration: none;
      transition: all 0.2s;

      &:hover {
        background-color: ${shade(0.2, colors.Primary)};
      }
    }
  }
`
