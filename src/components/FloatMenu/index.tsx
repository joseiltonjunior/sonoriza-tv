import { useFloatMenu } from '@/hooks/useFloatMenu'
import { Anchor, Container, Content, NavButton, Button } from './styles'

import { t } from 'i18next'

import { MdEdit, MdPerson, MdStar } from 'react-icons/md'
import { MutableRefObject, useEffect, useState } from 'react'

interface FloatMenuProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  personButtonRef: MutableRefObject<any>
}

export function FloatMenu({ personButtonRef }: FloatMenuProps) {
  const { visible, closeFloatMenu } = useFloatMenu()
  const [align, setAlign] = useState(0)

  useEffect(() => {
    const handleButtonPosition = () => {
      if (personButtonRef.current) {
        const botaoPosicao = personButtonRef.current.getBoundingClientRect()
        const distanciaDireita = window.innerWidth - botaoPosicao.right
        setAlign(distanciaDireita)
      }
    }

    handleButtonPosition()

    window.addEventListener('resize', handleButtonPosition)

    return () => {
      window.removeEventListener('resize', handleButtonPosition)
    }
  }, [personButtonRef])

  return (
    <Container
      onMouseLeave={() => closeFloatMenu()}
      initial={{ opacity: 0 }}
      animate={{
        x: visible ? -align : 300,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.4 }}
    >
      <Content>
        <NavButton>
          <MdPerson /> <p>Conta</p>
        </NavButton>
        <NavButton>
          <MdEdit />
          <p>Gerência perfis</p>
        </NavButton>

        <Anchor onClick={() => closeFloatMenu()} to={'/favorites'}>
          <MdStar />
          <p>{t('favorites')}</p>
        </Anchor>
      </Content>

      <Button>
        <p>Entrar</p>
      </Button>
    </Container>
  )
}
