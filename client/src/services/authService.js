import localStorageService from './localStorageService'
import axios from 'axios'
import configFile from '../config.json'
import logService from './logService'

let baseURL = configFile.apiEndpoint
if (process.env.NODE_ENV === 'production') { // PRODUCTION
  baseURL = configFile.productionApiEndpoint
}

const httpAuth = axios.create({baseURL})

httpAuth.interceptors.response.use(res => res,
  err => {
    const expectedError = err.response // && err.response.status >= 400 && err.response.status < 500
    if (!expectedError && !err.message.startsWith('Unexpected error:')) {
      err.message = 'Unexpected error: ' + err.message
    } else {
      err.message = `Status: ${err.response.status}. ${err.message}`
    }
    logService.log(err)
    return Promise.reject(err)
  })

const authEndpoint = 'auth/'

const authService = {
  register: async (body) => {
    const {data} = await httpAuth.post(authEndpoint + 'register',
      body)
    return data
  },

  login: async (body) => {
    const {data} = await httpAuth.post(authEndpoint + 'login',
      body)
    return data
  },

  refresh: async () => {
    const {data} = await httpAuth.post(authEndpoint + 'token',
      {refreshToken: localStorageService.getRefreshToken()})
    return data
  }
}

export default authService
