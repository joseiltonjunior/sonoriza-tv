import { colors } from '@/styles/colors'
import styled, { css } from 'styled-components'

interface BoxProps {
  $check: boolean
}

export const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;

  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;
`

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100vh;
`

export const BoxModal = styled.div`
  position: absolute;
  background-color: ${colors.Dark_600};
  padding: 1rem 2rem;
  border-radius: 6px;

  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 1.2rem;
    font-weight: 500;
    color: ${colors.Light};
  }
`

export const Box = styled.button<BoxProps>`
  padding: 6px 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  box-shadow: none;

  color: ${colors.Light};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  position: relative;

  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;

    ${(props) =>
      props.$check &&
      css`
        border: 4px solid ${colors.Primary};
      `}
  }

  svg {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`

export const Content = styled.div`
  display: grid;
  grid-template-columns: 6rem 6rem;
  justify-content: space-between;
  gap: 1rem;

  margin-top: 1rem;
`
