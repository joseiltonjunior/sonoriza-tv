import { SkeletonTheme } from 'react-loading-skeleton'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'

import darkTheme from '@/styles/dark'
import lightTheme from '@/styles/light'
import GlobalStyle from '@/styles/global'

import { ReduxProps } from '@/storage'
import { useSelector } from 'react-redux'

import { Analytics } from '@vercel/analytics/react'

import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css'
import { PropsWithChildren } from 'react'
import { colors } from '@/styles/colors'
import { ThemeProps } from '@/storage/modules/theme/reducer'
import { ModalProvider } from './useModal'

export function Hooks({ children }: PropsWithChildren) {
  const { theme } = useSelector<ReduxProps, ThemeProps>((item) => item.theme)

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <ModalProvider>
        <GlobalStyle />
        <SkeletonTheme
          baseColor={colors.Dark_800}
          highlightColor={colors.Dark_300}
        >
          {children}
        </SkeletonTheme>
        <ToastContainer />
      </ModalProvider>
      <Analytics />
    </ThemeProvider>
  )
}
