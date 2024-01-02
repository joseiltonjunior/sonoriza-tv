import { Outlet } from 'react-router-dom'
import { Modal } from './components/Modal'
import { FloatMenu } from './components/FloatMenu'
import { Header } from './components/Header'
import { useRef } from 'react'
// import { ContentFloatMenu } from './styles'

function App() {
  const personButtonRef = useRef()

  return (
    <>
      <Header personButtonRef={personButtonRef} />
      <Outlet />
      <Modal />

      <FloatMenu personButtonRef={personButtonRef} />
    </>
  )
}

export default App
