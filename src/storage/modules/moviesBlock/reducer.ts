import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MoviesBlockProps {
  moviesBlock: number[]
}

const initialState: MoviesBlockProps = {
  moviesBlock: [],
}

const moviesBlockSlice = createSlice({
  name: 'moviesBlock',
  initialState,
  reducers: {
    setBlockList(state, action: PayloadAction<number>) {
      const movieId = action.payload
      state.moviesBlock.push(movieId)
    },
  },
})

export const { setBlockList } = moviesBlockSlice.actions

export default moviesBlockSlice.reducer
