import App from '@/App'
import { Favorites } from '@/pages/Favorites'
import { Home } from '@/pages/Home'
import { MovieDetails } from '@/pages/MovieDetails'
import { NotFoundPage } from '@/pages/NotFoundPage'

import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/movie/:id',
        element: <MovieDetails />,
      },
      {
        path: '/favorites',
        element: <Favorites />,
      },
    ],
  },
])
