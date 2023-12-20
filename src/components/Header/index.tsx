import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Content,
  Logo,
  Container,
  Brand,
  Profile,
  LimitContent,
} from './styles'
import { ReduxProps } from '@/storage'
import { ThemeProps, setTheme } from '@/storage/modules/theme/reducer'
import logo from '@/assets/logo.png'
import brazil from '@/assets/brazil.png'
import eua from '@/assets/eua.png'

import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { colors } from '@/styles/colors'
import { LanguageProps, setLang } from '@/storage/modules/language/reducer'
import { useModal } from '@/hooks/useModal'
import { Link } from 'react-router-dom'

import kids from '@/assets/thumb-2.png'
import normal from '@/assets/thumb-1.png'
import { ProfileProps } from '@/storage/modules/profile/reducer'

export function Header() {
  const { theme } = useSelector<ReduxProps, ThemeProps>((item) => item.theme)
  const { lang } = useSelector<ReduxProps, LanguageProps>(
    (item) => item.language,
  )

  const { profile } = useSelector<ReduxProps, ProfileProps>(
    (item) => item.profile,
  )

  const { openModal } = useModal()

  const dispatch = useDispatch()

  return (
    <Container>
      <LimitContent>
        <Link to={'/'}>
          <Logo src={logo} alt="logo" />
        </Link>

        <Content>
          <Button
            onClick={() =>
              dispatch(setLang({ lang: lang === 'pt-BR' ? 'en-US' : 'pt-BR' }))
            }
          >
            <Brand src={lang === 'pt-BR' ? brazil : eua} alt="brand" />
          </Button>

          <Button
            onClick={() =>
              dispatch(setTheme({ theme: theme === 'dark' ? 'light' : 'dark' }))
            }
          >
            {theme === 'dark' ? (
              <MdLightMode color={colors.Light} size={20} />
            ) : (
              <MdDarkMode color={colors.Light} size={20} />
            )}
          </Button>

          <Profile onClick={() => openModal()}>
            <img src={profile === 'kids' ? kids : normal} alt="profile" />
          </Profile>
        </Content>
      </LimitContent>
    </Container>
  )
}
