import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SearchProps {
  filter: string
}

const initialState: SearchProps = {
  filter: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      const newSearch = action.payload
      state.filter = newSearch
    },
  },
})

export const { setFilter } = searchSlice.actions

export default searchSlice.reducer
