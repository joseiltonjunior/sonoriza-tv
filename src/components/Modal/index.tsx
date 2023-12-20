import { useModal } from '@/hooks/useModal'

import { Container, Overlay, BoxModal, Box, Content } from './styles'
import { ProfileProps, setProfile } from '@/storage/modules/profile/reducer'
import { ReduxProps } from '@/storage'
import { useDispatch, useSelector } from 'react-redux'

import kids from '@/assets/thumb-2.png'
import normal from '@/assets/thumb-1.png'

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
      </BoxModal>
    </Container>
  )
}
