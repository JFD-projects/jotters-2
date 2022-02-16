import localStorageService from '../services/localStorage.service'
import { createSlice } from '@reduxjs/toolkit'

import history from '../utils/history'
import authService from '../services/authService'
import errorService from '../services/errorService'
import userService from '../services/userService'

const initialState = {
    isLoading: false,
    currentUser: null,
    isLoggedIn: false
  }

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requested(state) {
      state.isLoading = true
    },
    requestSuccess(state, action) {
      state.currentUser = action.payload
      state.isLoggedIn = true
      state.isLoading = false
    },
    requestFailed(state) {
      state.isLoading = false
    },
    userLoggedOut(state) {
      state.currentUser = null
      state.isLoggedIn = false
    }
  }
})

const {requested, requestSuccess, requestFailed, userLoggedOut} = slice.actions

export const loadCurrentUser = () => async dispatch => {
  if (localStorageService.getAccessToken()) {
    dispatch(requested())
    try {
      const data = await userService.getCurrentUser()
      dispatch(requestSuccess(data))

    } catch (err) {
      errorService.handleError(err)
      dispatch(requestFailed())
    }
  }
}

export const register = ({name, email, password, ...rest}) => async dispatch => {
  dispatch(requested())
  try {
    const data = await authService.register({name, email, password})
    localStorageService.setToken(data)
    dispatch(requestSuccess({
      _id: data.userId,
      name,
      email,
      ...rest
    }))

  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const login = ({email, password}) => async dispatch => {
  dispatch(requested())
  try {
    const data = await authService.login({email, password})
    localStorageService.setToken(data)
    const currentUser = await userService.getCurrentUser()
    dispatch(requestSuccess(currentUser))

  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed())
  }
}

export const logout = () => async dispatch => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
  history.push('/')
}



export const getIsLoggedIn = () => state => state.auth.isLoggedIn

export const getCurrentUserId = () => state => state.auth.currentUser._id

export const getCurrentUser = () => state => state.auth.currentUser

export const getLoadingStatus = () => state => state.auth.isLoading


export default slice.reducer
