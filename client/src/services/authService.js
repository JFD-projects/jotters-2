import httpService from './http.service'
const userEndpoint = 'auth/'

const authService = {
  register: async (body) => {
    const {data} = await httpService.post(userEndpoint + 'register',
      body,
      {withCredentials: true})
    return data
  },

  login: async (body) => {
    const {data} = await httpService.post(userEndpoint + 'login',
      body,
      {withCredentials: true})
    return data
  }
}

export default authService
