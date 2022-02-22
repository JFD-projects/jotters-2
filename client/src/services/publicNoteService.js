import httpService from './httpService'

const jotterEndpoint = 'publicNote/'

const publicNoteService = {
  fetchAll: async () => {
    return await httpService.get(jotterEndpoint)
  },

  getById: async (id) => {
    return await httpService.get(jotterEndpoint + id)
  }
}

export default publicNoteService
