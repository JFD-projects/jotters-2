import axios from 'axios'
import configFile from '../config.json'
import logService from './logService'
import localStorageService from './localStorageService'
import authService from './authService'

let baseURL = configFile.apiEndpoint
if (process.env.NODE_ENV === 'production') { // PRODUCTION
  baseURL = configFile.productionApiEndpoint
}

const http = axios.create({baseURL})

let sendRefreshIsAllowed = true

http.interceptors.response.use(res => res,
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

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getExpiresDate()
    const refreshToken = localStorageService.getRefreshToken()

    if (refreshToken && (expiresDate > Date.now())) {
      // Refresh tokens only if last refresh was more then 20 seconds ago
      if ((expiresDate < (Date.now() + (configFile.tokenExpiresIn - 20) * 1000 )
        && sendRefreshIsAllowed)) {
        sendRefreshIsAllowed = false
        const data = await authService.refresh()
        sendRefreshIsAllowed = true
        localStorageService.setToken(data)
      }
    } else {
      localStorageService.removeAuthData()
    }

    const accessToken = localStorageService.getAccessToken()
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: 'Bearer ' + accessToken
      }
    }

    return config
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete
}

export default httpService
