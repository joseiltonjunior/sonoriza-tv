import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Content,
  Logo,
  Container,
  Brand,
  Profile,
  LimitContent,
  HomeButtom,
  ContentLeft,
} from './styles'
import { ReduxProps } from '@/storage'
import { ThemeProps, setTheme } from '@/storage/modules/theme/reducer'
import logo from '@/assets/logo.png'
import brazil from '@/assets/brazil.png'
import eua from '@/assets/eua.png'

import { MdDarkMode, MdLightMode, MdMenu } from 'react-icons/md'
import { colors } from '@/styles/colors'
import { LanguageProps, setLang } from '@/storage/modules/language/reducer'

import { Link } from 'react-router-dom'

import kids from '@/assets/thumb-2.png'
import normal from '@/assets/thumb-1.png'
import { ProfileProps } from '@/storage/modules/profile/reducer'
import { Search } from '../Search'

import { SearchProps, setFilter } from '@/storage/modules/search/reducer'
import i18next, { t } from 'i18next'
import { useFloatMenu } from '@/hooks/useFloatMenu'
import { MutableRefObject } from 'react'

interface HeaderProps {
  isHome?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  personButtonRef: MutableRefObject<any>
}

export function Header({ isHome, personButtonRef }: HeaderProps) {
  const { theme } = useSelector<ReduxProps, ThemeProps>((item) => item.theme)
  const { lang } = useSelector<ReduxProps, LanguageProps>(
    (item) => item.language,
  )

  const { profile } = useSelector<ReduxProps, ProfileProps>(
    (item) => item.profile,
  )

  const { filter } = useSelector<ReduxProps, SearchProps>((item) => item.search)

  const { openFloatMenu } = useFloatMenu()

  const dispatch = useDispatch()

  return (
    <Container>
      <LimitContent>
        <ContentLeft>
          <HomeButtom onClick={() => openFloatMenu()}>
            <MdMenu size={30} color={colors.Light} />
          </HomeButtom>

          <Link to={'/'} title="Home">
            <Logo src={logo} alt="logo" />
          </Link>
        </ContentLeft>

        <Content>
          {isHome && (
            <Search
              id="search"
              placeholder={t('search')}
              value={filter}
              autoComplete="off"
              onChange={(e) => dispatch(setFilter(e.currentTarget.value))}
            />
          )}
          <div className="hiddenMobile">
            <Button
              title={t('lang')}
              onClick={() => {
                const newLang = lang === 'pt-BR' ? 'en-US' : 'pt-BR'
                dispatch(setLang({ lang: newLang }))
                i18next.changeLanguage(newLang)
              }}
            >
              <Brand src={lang === 'pt-BR' ? brazil : eua} alt="brand" />
            </Button>

            <Button
              title={t('theme')}
              onClick={() =>
                dispatch(
                  setTheme({ theme: theme === 'dark' ? 'light' : 'dark' }),
                )
              }
            >
              {theme === 'dark' ? (
                <MdLightMode color={colors.Light} size={20} />
              ) : (
                <MdDarkMode color={colors.Light} size={20} />
              )}
            </Button>

            {/* <Anchor title={t('favorites')} to={'/favorites'}>
              <MdStar color={colors.Yellow_600} size={20} />
            </Anchor> */}
            <Profile
              ref={personButtonRef}
              onMouseEnter={() => openFloatMenu()}
              title="Profile"
            >
              <img src={profile === 'kids' ? kids : normal} alt="profile" />
            </Profile>
          </div>
        </Content>
      </LimitContent>
    </Container>
  )
}
