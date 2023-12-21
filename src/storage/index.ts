import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { ThemeProps } from './modules/theme/reducer'

import rootReducer from './modules/rootReducer'
import { LanguageProps } from './modules/language/reducer'
import { ProfileProps } from './modules/profile/reducer'
import { HistoricProps } from './modules/historic/reducer'
import { FavoritesProps } from './modules/favorites/reducer'
import { MoviesBlockProps } from './modules/moviesBlock/reducer'
import { SearchProps } from './modules/search/reducer'
import { GenreProps } from './modules/genre/reducer'

export interface ReduxProps {
  theme: ThemeProps
  language: LanguageProps
  profile: ProfileProps
  historic: HistoricProps
  favorites: FavoritesProps
  moviesBlock: MoviesBlockProps
  search: SearchProps
  genre: GenreProps
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['search', 'genre'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

const persistor = persistStore(store)

export { store, persistor }
