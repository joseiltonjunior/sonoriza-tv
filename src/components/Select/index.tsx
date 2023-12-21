import { ComponentProps } from 'react'
import { Container } from './styles'

interface SelectProps extends ComponentProps<'select'> {
  options: { value: string; label: string }[]
  label: string
  placeholder: string
}

export function Select({
  options,
  label,
  value,

  onChange,
}: SelectProps) {
  return (
    <Container>
      <label>{label}</label>

      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Container>
  )
}
