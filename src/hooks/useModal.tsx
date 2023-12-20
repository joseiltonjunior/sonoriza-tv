import React, { createContext, useContext, useState } from 'react'

interface ModalContextData {
  visible: boolean
  openModal(): void
  closeModal(): void
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData)

export function ModalProvider({ children }: React.PropsWithChildren) {
  const [visible, setIsVisible] = useState(false)

  const openModal = () => {
    setIsVisible(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    document.body.style.overflow = 'auto'
    setIsVisible(false)
  }

  return (
    <ModalContext.Provider value={{ visible, closeModal, openModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal(): ModalContextData {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModal must be used within an ModalProvider')
  }

  return context
}
