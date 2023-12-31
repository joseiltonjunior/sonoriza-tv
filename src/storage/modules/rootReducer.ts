import { combineReducers } from '@reduxjs/toolkit'

import theme from './theme/reducer'
import language from './language/reducer'
import profile from './profile/reducer'
import historic from './historic/reducer'
import favorites from './favorites/reducer'
import moviesBlock from './moviesBlock/reducer'
import search from './search/reducer'
import genre from './genre/reducer'

export default combineReducers({
  theme,
  language,
  profile,
  historic,
  favorites,
  moviesBlock,
  search,
  genre,
})
