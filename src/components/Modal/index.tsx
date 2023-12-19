import { useModal } from '@/hooks/useModal'

import { Container, Overlay, BoxModal, Box, Content } from './styles'
import { ProfileProps, setProfile } from '@/storage/modules/profile/reducer'
import { ReduxProps } from '@/storage'
import { useDispatch, useSelector } from 'react-redux'
import { MdCheck } from 'react-icons/md'
import { colors } from '@/styles/colors'

export function Modal() {
  const { closeModal, visible } = useModal()

  const { profile } = useSelector<ReduxProps, ProfileProps>(
    (item) => item.profile,
  )

  const dispatch = useDispatch()

  if (!visible) return

  return (
    <Container>
      <Overlay onClick={() => closeModal()} />
      <BoxModal>
        <p>Escolha um perfil</p>
        <Content>
          <Box
            onClick={() => {
              dispatch(setProfile({ profile: 'kids' }))
              closeModal()
            }}
          >
            Infantil
            {profile === 'kids' && <MdCheck color={colors.Light} size={20} />}
          </Box>
          <Box
            onClick={() => {
              dispatch(setProfile({ profile: 'normal' }))
              closeModal()
            }}
          >
            Normal
            {profile === 'normal' && <MdCheck color={colors.Light} size={20} />}
          </Box>
        </Content>
      </BoxModal>
    </Container>
  )
}
