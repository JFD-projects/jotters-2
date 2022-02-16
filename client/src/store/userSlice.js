import { createSlice } from '@reduxjs/toolkit'
import localStorageService from '../services/localStorage.service'
import userService from '../services/userService'

const initialState = {
  entities: null,
  isLoading: true
}

const slice = createSlice({
  name: 'users',
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
    userCreated(state, action) {
      state.entities.push(action.payload)
    },
    userUpdated(state, action) {
      const idx = state.entities.findIndex(i => i._id === localStorageService.getUserId())
      state.entities[idx] = {...state.entities[idx], ...action.payload}
    }
  }
})

const {requested, received, requestFailed, userCreated, userUpdated} = slice.actions


export const createUser = (payload) => async (dispatch, state) => {
    dispatch(requested())
    try {
      const {content} = await userService.create(payload)
      dispatch(userCreated(content))
      history.push('/users')
    } catch (err) {
      dispatch(userCreateFailed(err.response?.data?.error || err.message))
    }
}


export default slice.reducer
