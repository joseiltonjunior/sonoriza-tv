import styled, { createGlobalStyle } from 'styled-components'
import { colors } from './colors'

export default createGlobalStyle`
:focus{
  outline: transparent;
  box-shadow: none;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.font};
  -webkit-font-smoothing: antialiased;
  

  @media (max-width: 900px) {
    overflow-y: scroll;
  }
}

body::-webkit-scrollbar {
  width: 0.4rem;
}

body::-webkit-scrollbar-thumb {
  background: ${colors.Primary};
}

body,
input,
textarea,
button {
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  font-weight: 400;
}

`

export const Line = styled.div`
  margin: 1rem 0;
  border-bottom: 1px solid ${colors.Primary};
`
