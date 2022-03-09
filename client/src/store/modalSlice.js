import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentModal: null,
  data: null
}

const slice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    show(state, action) {
      state.currentModal = action.payload.currentModal
      state.data = action.payload.data
    },
    hide(state) {
      state.currentModal = null
      state.data = null
    }
  }
})

const {show, hide} = slice.actions

export const showModal = (payload) => (dispatch) => {
  dispatch(show(payload))
}

export const hideModal = () => (dispatch) => {
  dispatch(hide())
}

export const getPayload = () => (state) => {
  return state.modal
}

export default slice.reducer
