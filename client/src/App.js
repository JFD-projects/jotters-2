import React from 'react'
import Routs from './routing/routes'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AppLoader from './components/hoc/appLoader'
import AppModal from './components/modal/appModal'

function App() {
  return (
    <AppLoader>
      <BrowserRouter>
        <Routs/>
      </BrowserRouter>

      <AppModal/>
      <ToastContainer/>
    </AppLoader>
  )
}

export default App
