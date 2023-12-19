import { Header } from '@/components/Button/Header'
import { ReduxProps } from '@/storage'
import { ThemeProps } from '@/storage/modules/theme/reducer'
import { useSelector } from 'react-redux'

export function Home() {
  const { theme } = useSelector<ReduxProps, ThemeProps>((item) => item.theme)

  return (
    <div>
      <Header />
      <p>HOME</p>
      <p>Theme: {theme}</p>
    </div>
  )
}
