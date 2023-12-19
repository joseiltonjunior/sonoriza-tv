import { ComponentProps } from 'react'
import { Content } from './styles'

interface ButtonProps extends ComponentProps<'button'> {
  title: string
}

export function Button({ title }: ButtonProps) {
  return (
    <Content>
      <p>{title}</p>
    </Content>
  )
}
