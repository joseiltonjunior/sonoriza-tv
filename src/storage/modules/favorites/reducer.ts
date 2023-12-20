import { MovieDetailsProps } from '@/utils/types/movieDetails'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface FavoritesProps {
  favorites: MovieDetailsProps[]
}

const initialState: FavoritesProps = {
  favorites: [],
}

const historicSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<MovieDetailsProps>) {
      const movie = action.payload
      const exist = state.favorites.find((item) => item.id === movie.id)

      let newArray

      if (exist) {
        const filter = state.favorites.filter((item) => item.id !== exist.id)

        newArray = filter
      } else {
        newArray = [movie, ...state.favorites]
      }

      return {
        ...state,
        favorites: newArray,
      }
    },
  },
})

export const { setFavorites } = historicSlice.actions

export default historicSlice.reducer
