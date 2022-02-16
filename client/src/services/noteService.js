import httpService from './http.service'
import getTitleFromContent from '../utils/getTitleFromContent'
import { getAccessToken } from './localStorage.service'

const noteEndpoint = 'note/'

const noteService = {
  fetchAll: async (jotterId) => {
    return await httpService.get(noteEndpoint,
      {
        params: {jotterId},
        headers: {Authorization: 'Bearer ' + getAccessToken()},
        withCredentials: true
      })
  },

  // fetchPublic: async () => {
  //   const data = await httpService.get(noteEndpoint,
  //     {
  //       params: {public: true},
  //       headers: {Authorization: 'Bearer ' + getAccessToken()},
  //       withCredentials: true
  //     })
  //   return data
  // },

  getById: async (noteId) => {
    return await httpService.get(noteEndpoint + noteId,
      {
        headers: {Authorization: 'Bearer ' + getAccessToken()},
        withCredentials: true
      })
  },

  update: async (noteId, body) => {
    return await httpService.patch(noteEndpoint + noteId,
      {...body, title: getTitleFromContent(body.content)},
      {
        headers: {Authorization: 'Bearer ' + getAccessToken()},
        withCredentials: true
      })
  },

  delete: async (noteId) => {
    await httpService.delete(noteEndpoint + noteId,
      {
        headers: {Authorization: 'Bearer ' + getAccessToken()},
        withCredentials: true
      })
  },

  add: async (body) => {
    return await httpService.post(noteEndpoint,
      body,
      {
        headers: {Authorization: 'Bearer ' + getAccessToken()},
        withCredentials: true
      })
  }
}

export default noteService
