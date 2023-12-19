import { combineReducers } from '@reduxjs/toolkit'

import theme from './theme/reducer'
import language from './language/reducer'
import profile from './profile/reducer'

export default combineReducers({
  theme,
  language,
  profile,
})
