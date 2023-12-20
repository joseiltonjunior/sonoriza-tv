import { MoviesProps } from '@/utils/types/movies'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface HistoricProps {
  historic: MoviesProps[]
}

const initialState: HistoricProps = {
  historic: [],
}

const historicSlice = createSlice({
  name: 'hisoric',
  initialState,
  reducers: {
    setHistoric(state, action: PayloadAction<MoviesProps>) {
      const movie = action.payload
      const existingIndex = state.historic.findIndex(
        (item) => item.id === movie.id,
      )

      let newHistoric

      if (existingIndex !== -1) {
        newHistoric = [
          movie,
          ...state.historic.slice(0, existingIndex),
          ...state.historic.slice(existingIndex + 1),
        ]
      } else {
        newHistoric = [movie, ...state.historic]
      }

      newHistoric = newHistoric.slice(0, 10)

      return {
        ...state,
        historic: newHistoric,
      }
    },
  },
})

export const { setHistoric } = historicSlice.actions

export default historicSlice.reducer
