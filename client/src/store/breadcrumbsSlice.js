import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  crumbs: [
    {
      to: '/',
      label: 'Home'
    }
  ]
}

const slice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    update(state, action) {
      state.crumbs = action.payload
    }
  }
})

const {update} = slice.actions

export const updateBreadcrumbs = (crumbs) => (dispatch) => {
  dispatch(update(crumbs))
}

export const getBreadcrumbs = () => (state) => {
  return state.breadcrumbs.crumbs
}

export default slice.reducer
