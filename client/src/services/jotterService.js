import httpService from './httpService'

const jotterEndpoint = 'jotter/'

const jotterService = {
  fetchAll: async () => {
    return await httpService.get(jotterEndpoint)
  },

  getById: async (id) => {
    return await httpService.get(jotterEndpoint + id)
  },

  update: async (id, body) => {
    return await httpService.patch(jotterEndpoint + id, body)
  },

  delete: async (id) => {
    await httpService.delete(jotterEndpoint + id)
  },

  add: async (body) => {
    return await httpService.post(jotterEndpoint, body)
  }
}

export default jotterService
