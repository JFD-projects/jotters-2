import httpService from './httpService'

const commentEndpoint = 'comment/'

const commentService = {
  fetchAll: async (noteId) => {
    return await httpService.get(commentEndpoint,
      {params: {noteId}})
  },

  add: async (body) => {
    return await httpService.post(commentEndpoint, body)
  },

  update: async (commentId, body) => {
    return await httpService.patch(commentEndpoint + commentId, body)
  },

  delete: async (commentId) => {
    await httpService.delete(commentEndpoint + commentId)
  }
}

export default commentService
