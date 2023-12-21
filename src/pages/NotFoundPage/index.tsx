import notFound from '@/assets/404.png'
import { Link } from 'react-router-dom'
import { Container } from './styles'

export function NotFoundPage() {
  return (
    <Container>
      <div>
        <img src={notFound} alt="404" />

        <p>Oops! Page not found.</p>
        <Link to={'/'} title="Go to home">
          HOME
        </Link>
      </div>
    </Container>
  )
}
