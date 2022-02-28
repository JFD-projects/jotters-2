import httpService from './httpService'

const commentEndpoint = 'comment/'

const commentService = {
  fetchAll: async (noteId) => {
    return await httpService.get(commentEndpoint,
      {params: {noteId}})
  },

  add: async (body) => {
    return await httpService.post(commentEndpoint,
      body)
  },

  delete: async (noteId) => {
    await httpService.delete(commentEndpoint + noteId)
  }
}

export default commentService
