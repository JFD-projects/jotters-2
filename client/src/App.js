import React from 'react'
import Routing from './routing/routing'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AppLoader from './components/hoc/appLoader'

function App() {
  return (
    <AppLoader>
      <BrowserRouter>
        <Routing/>
      </BrowserRouter>

      <ToastContainer/>
    </AppLoader>
  )
}

export default App
