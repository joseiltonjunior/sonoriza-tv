import { ComponentProps } from 'react'
import { MdClear, MdSearch } from 'react-icons/md'
import { Container } from './styles'
import { colors } from '@/styles/colors'
import { useDispatch } from 'react-redux'
import { setFilter } from '@/storage/modules/search/reducer'

interface SearchProps extends ComponentProps<'input'> {}

export function Search({ ...rest }: SearchProps) {
  const dispatch = useDispatch()

  return (
    <Container>
      <MdSearch color={colors.Dark_400} />
      <input {...rest} type="text" autoComplete="off" />
      <button onClick={() => dispatch(setFilter(''))}>
        <MdClear />
      </button>
    </Container>
  )
}
