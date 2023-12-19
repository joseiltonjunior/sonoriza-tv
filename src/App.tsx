import { Outlet } from 'react-router-dom'
import { Modal } from './components/Modal'

function App() {
  return (
    <>
      <Outlet />
      <Modal />
    </>
  )
}

export default App
