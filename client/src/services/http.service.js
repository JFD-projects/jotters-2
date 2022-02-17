import axios from 'axios'
import configFile from '../config.json'
import logService from './log.service'

let baseURL = configFile.apiEndpoint
if (process.env.NODE_ENV === 'production') { // PRODUCTION
  baseURL = configFile.productionApiEndpoint
}

const http = axios.create({
  baseURL
})

http.interceptors.response.use(res => res,
  err => {
    logService.log(err)
    const expectedError = err.response && err.response.status >= 400 && err.response.status < 500
    if (!expectedError && !err.message.startsWith('Unexpected error:')) {
      err.message = 'Unexpected error: ' + err.message
    }
    return Promise.reject(err)
  })

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete
}

export default httpService
