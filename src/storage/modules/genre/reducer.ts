import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GenreProps {
  genre: number | null
}

const initialState: GenreProps = {
  genre: null,
}

const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    setGenre(state, action: PayloadAction<GenreProps>) {
      state.genre = action.payload.genre
    },
  },
})

export const { setGenre } = genreSlice.actions

export default genreSlice.reducer
