import httpService from './http.service'
const infoEndpoint = 'info/'

const infoService = {
  get: async (lng) => {
    const {data} = await httpService.get(infoEndpoint + lng, {withCredentials: true})
    return data
  },

  update: async (info) => {
    const {data} = await httpService.patch(infoEndpoint + info.lng, info, {withCredentials: true})
    return data
  }
}

export default infoService
