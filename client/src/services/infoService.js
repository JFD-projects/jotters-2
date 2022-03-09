import httpService from './httpService'

const infoEndpoint = 'info/'

const infoService = {
  get: async (lng) => {
    return await httpService.get(infoEndpoint + lng)
  },

  update: async (info) => {
    return await httpService.patch(infoEndpoint + info.lng,
      info)
  }
}

export default infoService
