import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ThemeProps {
  theme: 'dark' | 'light'
}

const initialState: ThemeProps = {
  theme: 'dark',
}

const themeSlice = createSlice({
  name: 'thema',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeProps>) {
      state.theme = action.payload.theme
    },
  },
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
