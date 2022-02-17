import httpService from './http.service'

const infoEndpoint = 'info/'

const infoService = {
  get: async (lng) => {
    return await httpService.get(infoEndpoint + lng, {withCredentials: true})
  },

  update: async (info) => {
    return await httpService.patch(infoEndpoint + info.lng, info, {withCredentials: true})
  }
}

export default infoService
