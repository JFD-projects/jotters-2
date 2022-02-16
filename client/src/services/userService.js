import httpService from './http.service'
import localStorageService from './localStorage.service'
const userEndpoint = 'user/'

const userService = {
  fetch: async () => {
    const {data} = await httpService.get(userEndpoint,
      {withCredentials: true})
    return data
  },

  get: async (id) => {
    const {data} = await httpService.get(userEndpoint + id,
      {withCredentials: true})
    return data
  },

  getCurrentUser: async () => {
    const {data} = await httpService.get(userEndpoint + localStorageService.getUserId())
    return data
  },

  create: async (payload) => {
    const {data} = await httpService.patch(userEndpoint + payload._id, payload)
    return data
  },

  update: async (id, payload) => {
    const {data} = await httpService.patch(userEndpoint + id, payload)
    return data
  },
}

export default userService
