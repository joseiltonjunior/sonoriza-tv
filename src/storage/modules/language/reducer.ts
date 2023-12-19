import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LanguageProps {
  lang: 'pt-BR' | 'en-US'
}

const initialState: LanguageProps = {
  lang: 'pt-BR',
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<LanguageProps>) {
      state.lang = action.payload.lang
    },
  },
})

export const { setLang } = languageSlice.actions

export default languageSlice.reducer
