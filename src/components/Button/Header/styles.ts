import { colors } from '@/styles/colors'
import styled from 'styled-components'

export const Content = styled.header`
  background-color: ${colors.Primary};
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  justify-content: space-between;
`

export const Logo = styled.img`
  height: 40px;
  width: 150px;
  object-fit: contain;
`

export const ChangeTheme = styled.button`
  padding: 4px;
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
`
