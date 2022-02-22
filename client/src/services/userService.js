import httpService from './httpService'
import localStorageService from './localStorageService'
const userEndpoint = 'user/'

const userService = {
  // fetchAll: async () => {
  //   const {data} = await httpService.get(userEndpoint)
  //   return data
  // },

  // getById: async (id) => {
  //   const {data} = await httpService.get(userEndpoint + id)
  //   return data
  // },

  getCurrentUser: async () => {
    const {data} = await httpService.get(userEndpoint + localStorageService.getUserId())
    return data
  },

  updateCurrentUser: async (payload) => {
    const {data} = await httpService.patch(userEndpoint + localStorageService.getUserId(),
      payload)
    return data
  },
}

export default userService
