import { colors } from '@/styles/colors'
import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
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
  height: 100%;
`

export const BoxModal = styled.div`
  position: absolute;
  background-color: ${colors.Dark_600};
  padding: 1rem;
  border-radius: 6px;
  width: 100%;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 1.2rem;
    font-weight: 500;
  }
`

export const Box = styled.button`
  padding: 6px 0;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: ${colors.Primary};
  color: ${colors.Light};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

export const Content = styled.div`
  display: grid;
  grid-template-columns: 8rem 8rem;
  justify-content: space-between;
  gap: 1rem;

  margin-top: 1rem;
`
