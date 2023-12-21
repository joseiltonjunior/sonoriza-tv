import { colors } from '@/styles/colors'
import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${colors.Light};
  border-radius: 4px;
  overflow: hidden;

  display: flex;

  width: 150px;

  gap: 4px;

  padding: 5px 8px;

  input {
    border: none;
    outline: none;
    box-shadow: none;
    width: 90%;
  }

  input::placeholder {
    color: ${colors.Dark_400};
  }
`
