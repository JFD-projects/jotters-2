import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/commentService'
import errorService from '../services/errorService'
import { sortArrayBy } from '../utils/helpers'

const initialState = {
  entities: null,
  isLoading: false
}

const slice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    requested(state) {
      state.isLoading = true
    },
    received(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    requestFailed(state) {
      state.isLoading = false
    },
    added(state, action) {
      state.entities = state.entities ? [...state.entities, action.payload] : [action.payload]
      state.isLoading = false
    },
    deleted(state, action) {
      state.entities = state.entities.filter(i => i._id !== action.payload)
      state.isLoading = false
    }
  }
})

const {requested, received, requestFailed, added, deleted} = slice.actions

export const loadComments = (noteId) => async (dispatch) => {
  dispatch(requested())
  try {
    const {data} = await commentService.fetchAll(noteId)
    dispatch(received(data))
  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const addNewComment = (comment, currentUser) => async (dispatch) => {
  dispatch(requested())
  try {
    const {data} = await commentService.add(comment)

    const payload = {
      ...data,
      userName: currentUser.name,
      userImage: currentUser.image
    }

    dispatch(added(payload))
  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const deleteComment = (commentId) => async (dispatch) => {
  dispatch(requested())
  try {
    await commentService.delete(commentId)
    dispatch(deleted(commentId))
  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const getCommentById = (commentId) => (state) => {
  return state.comments.entities ? state.comments.entities.find(c => c._id === commentId) : null
}

export const getCommentsList = () => (state) => {
  return sortArrayBy('byDate', state.comments.entities)
}

export const getLoadingStatus = () => (state) => {
  return state.comments.isLoading
}

export default slice.reducer
