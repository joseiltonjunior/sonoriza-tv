import React, { createContext, useContext, useState } from 'react'

interface FloatMenuContextData {
  visible: boolean
  openFloatMenu(): void
  closeFloatMenu(): void
}

const FloatMenuContext = createContext<FloatMenuContextData>(
  {} as FloatMenuContextData,
)

export function FloatMenuProvider({ children }: React.PropsWithChildren) {
  const [visible, setIsVisible] = useState(false)

  const openFloatMenu = () => {
    setIsVisible(true)
  }

  const closeFloatMenu = () => {
    setIsVisible(false)
  }

  return (
    <FloatMenuContext.Provider
      value={{ visible, closeFloatMenu, openFloatMenu }}
    >
      {children}
    </FloatMenuContext.Provider>
  )
}

export function useFloatMenu(): FloatMenuContextData {
  const context = useContext(FloatMenuContext)

  if (!context) {
    throw new Error('useFloatMenu must be used within an FloatMenuProvider')
  }

  return context
}
