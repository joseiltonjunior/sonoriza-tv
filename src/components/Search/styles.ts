import { colors } from '@/styles/colors'
import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${colors.Light};
  border-radius: 4px;
  overflow: hidden;

  display: flex;
  align-items: center;
  gap: 4px;

  padding: 5px 4px;

  input {
    border: none;
    outline: none;
    box-shadow: none;
  }

  input::placeholder {
    color: ${colors.Dark_400};
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    outline: none;
    box-shadow: none;
  }

  @media (max-width: 900px) {
    width: 120px;
  }
`
