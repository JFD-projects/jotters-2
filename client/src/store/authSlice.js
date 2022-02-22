import localStorageService from '../services/localStorageService'
import { createSlice } from '@reduxjs/toolkit'

import history from '../utils/history'
import authService from '../services/authService'
import errorService from '../services/errorService'
import userService from '../services/userService'

const initialState = {
  isLoading: false,
  currentUser: null,
  isLoggedIn: false,
  errorMessage: null
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
      state.errorMessage = null
      state.isLoggedIn = true
      state.isLoading = false
    },
    requestFailed(state, action) {
      state.isLoading = false
      state.errorMessage = action.payload
    },
    userLoggedOut(state) {
      state.currentUser = null
      state.errorMessage = null
      state.isLoggedIn = false
    },
    clearErrorMessage(state) {
      state.errorMessage = null
    }
  }
})

const {requested, requestSuccess, requestFailed, userLoggedOut, clearErrorMessage} = slice.actions

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
    // history.goBack()

  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed(err.response?.data?.message))
  }
}

export const login = ({email, password, redirect}) => async dispatch => {
  dispatch(requested())
  try {
    const data = await authService.login({email, password})
    localStorageService.setToken(data)
    const currentUser = await userService.getCurrentUser()
    dispatch(requestSuccess(currentUser))
    // history.push(redirect)
    // history.goBack()

  } catch (err) {
    errorService.handleError(err)
    dispatch(requestFailed(err.response?.data?.message))
    // =========================
    console.log('err.response?.data?.message:', err.response?.data?.message)
    // =========================
  }
}

export const updateCurrentUser = (payload) => async (dispatch) => {
  dispatch(requested())
  try {
    const currentUser = await userService.updateCurrentUser(payload)
    dispatch(requestSuccess(currentUser))
    // history.push('/users')
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

export const resetErrors = () => async dispatch => {
  dispatch(clearErrorMessage())
}



export const getIsLoggedIn = () => state => state.auth.isLoggedIn

export const getCurrentUserId = () => state => state.auth.currentUser._id

export const getCurrentUser = () => state => state.auth.currentUser

export const getLoadingStatus = () => state => state.auth.isLoading

export const getErrorMessage = () => state => state.auth.errorMessage


export default slice.reducer
