import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProfileProps {
  profile: 'kids' | 'normal'
}

const initialState: ProfileProps = {
  profile: 'normal',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileProps>) {
      state.profile = action.payload.profile
    },
  },
})

export const { setProfile } = profileSlice.actions

export default profileSlice.reducer
