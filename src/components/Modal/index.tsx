import { useModal } from '@/hooks/useModal'

import {
  Container,
  Overlay,
  BoxModal,
  Box,
  Content,
  ContentMobile,
} from './styles'
import { ProfileProps, setProfile } from '@/storage/modules/profile/reducer'
import { ReduxProps } from '@/storage'
import { useDispatch, useSelector } from 'react-redux'

import kids from '@/assets/thumb-2.png'
import normal from '@/assets/thumb-1.png'
import { Select } from '../Select'
import { LanguageProps, setLang } from '@/storage/modules/language/reducer'
import { ThemeProps, setTheme } from '@/storage/modules/theme/reducer'

export function Modal() {
  const { closeModal, visible } = useModal()

  const { lang } = useSelector<ReduxProps, LanguageProps>(
    (item) => item.language,
  )

  const { theme } = useSelector<ReduxProps, ThemeProps>((item) => item.theme)

  const { profile } = useSelector<ReduxProps, ProfileProps>(
    (item) => item.profile,
  )

  const dispatch = useDispatch()

  if (!visible) return

  return (
    <Container>
      <Overlay onClick={() => closeModal()} />
      <BoxModal>
        <p>Quem está assistindo?</p>
        <Content>
          <Box
            $check={profile === 'kids'}
            onClick={() => {
              dispatch(setProfile({ profile: 'kids' }))
              closeModal()
            }}
          >
            <img src={kids} alt="kids" />
            Kids
          </Box>
          <Box
            $check={profile === 'normal'}
            onClick={() => {
              dispatch(setProfile({ profile: 'normal' }))
              closeModal()
            }}
          >
            <img src={normal} alt="normal" />
            Normal
          </Box>
        </Content>
        <ContentMobile>
          <Select
            label="Idioma"
            options={[
              { label: 'pt-BR 🇧🇷', value: 'pt-BR' },
              { label: 'en-US 🇺🇸', value: 'en-US' },
            ]}
            placeholder="choose a item"
            value={lang}
            onChange={(e) => {
              closeModal()
              dispatch(
                setLang({
                  lang: e.currentTarget.value.includes('pt')
                    ? 'pt-BR'
                    : 'en-US',
                }),
              )
            }}
          />

          <Select
            label="Tema"
            options={[
              { label: 'Dark', value: 'dark' },
              { label: 'Light', value: 'light' },
            ]}
            placeholder="choose a item"
            value={theme}
            onChange={(e) => {
              closeModal()
              dispatch(
                setTheme({
                  theme: e.currentTarget.value === 'dark' ? 'dark' : 'light',
                }),
              )
            }}
          />
        </ContentMobile>
      </BoxModal>
    </Container>
  )
}
