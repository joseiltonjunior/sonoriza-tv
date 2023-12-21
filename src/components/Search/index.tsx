import { ComponentProps } from 'react'

import { Container } from './styles'

interface SearchProps extends ComponentProps<'input'> {}

export function Search({ ...rest }: SearchProps) {
  return (
    <Container>
      <input {...rest} type="text" autoComplete="off" />
    </Container>
  )
}
