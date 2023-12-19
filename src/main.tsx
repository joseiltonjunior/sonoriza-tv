import React from 'react'
import ReactDOM from 'react-dom/client'

import { Hooks } from './hooks/index.tsx'
import { router } from './routes/routes.tsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from '@/storage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Hooks>
        <RouterProvider router={router} />
      </Hooks>
    </Provider>
  </React.StrictMode>,
)
