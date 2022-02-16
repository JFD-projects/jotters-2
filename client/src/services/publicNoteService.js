import httpService from './http.service'
import { getAccessToken } from './localStorage.service'

const jotterEndpoint = 'publicNote/'

const publicNoteService = {
  fetchAll: async () => {
    return await httpService.get(jotterEndpoint,
      {
        withCredentials: true
      })
  },

  getById: async (id) => {
    return await httpService.get(jotterEndpoint + id,
      {
        withCredentials: true
      })
  }
}

export default publicNoteService
