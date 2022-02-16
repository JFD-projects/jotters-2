import httpService from './http.service'
import { getAccessToken } from './localStorage.service'

const jotterEndpoint = 'jotter/'

const jotterService = {
  fetchAll: async () => {
    return await httpService.get(jotterEndpoint,
      {
        headers: {Authorization: 'Bearer ' + getAccessToken()},
        withCredentials: true
      })
  },

  getById: async (id) => {
    return await httpService.get(jotterEndpoint + id,
      {
        headers: {Authorization: 'Bearer ' + getAccessToken()},
        withCredentials: true
      })
  },

  update: async (id, body) => {
    return await httpService.patch(jotterEndpoint + id,
      body,
      {
        headers: {Authorization: 'Bearer ' + getAccessToken()},
        withCredentials: true
      })
  },

  delete: async (id) => {
    await httpService.delete(jotterEndpoint + id,
      {
        headers: {Authorization: 'Bearer ' + getAccessToken()},
        withCredentials: true
      })
  },

  add: async (body) => {
    return await httpService.post(jotterEndpoint,
      body,
      {
        headers: {Authorization: 'Bearer ' + getAccessToken()},
        withCredentials: true
      })
  }
}

export default jotterService
