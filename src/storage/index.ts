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

export interface ReduxProps {
  theme: ThemeProps
  language: LanguageProps
  profile: ProfileProps
}

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
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