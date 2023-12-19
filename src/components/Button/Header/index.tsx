import { useDispatch, useSelector } from 'react-redux'
import { ChangeTheme, Content, Logo } from './styles'
import { ReduxProps } from '@/storage'
import { ThemeProps, setTheme } from '@/storage/modules/theme/reducer'
import logo from '@/assets/logo.png'

import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { colors } from '@/styles/colors'

export function Header() {
  const { theme } = useSelector<ReduxProps, ThemeProps>((item) => item.theme)

  const dispatch = useDispatch()

  return (
    <Content>
      <Logo src={logo} alt="logo" />

      <ChangeTheme
        onClick={() =>
          dispatch(setTheme({ theme: theme === 'dark' ? 'light' : 'dark' }))
        }
      >
        {theme === 'dark' ? (
          <MdLightMode color={colors.Light} size={20} />
        ) : (
          <MdDarkMode color={colors.Light} size={20} />
        )}
      </ChangeTheme>
    </Content>
  )
}
