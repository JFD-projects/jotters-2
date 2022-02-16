import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'react-quill/dist/quill.snow.css'
import 'react-toastify/dist/ReactToastify.css'
import './sass/main.scss'

import logService from './services/log.service'
import i18nService from './services/i18nextService'
import App from './App'
import createStore from './store/createStore'

logService.init()
i18nService.init()

const store = createStore()

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="loading...">
      <Provider store={store}>
        <App/>
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
)
