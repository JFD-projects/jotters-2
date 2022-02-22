import httpService from './httpService'
import getTitleFromContent from '../utils/getTitleFromContent'

const noteEndpoint = 'note/'

const noteService = {
  fetchAll: async (jotterId) => {
    return await httpService.get(noteEndpoint,
      {params: {jotterId}})
  },

  getById: async (noteId) => {
    return await httpService.get(noteEndpoint + noteId)
  },

  update: async (noteId, body) => {
    return await httpService.patch(noteEndpoint + noteId,
      {...body, title: getTitleFromContent(body.content)})
  },

  delete: async (noteId) => {
    await httpService.delete(noteEndpoint + noteId)
  },

  add: async (body) => {
    return await httpService.post(noteEndpoint,
      body)
  }
}

export default noteService
