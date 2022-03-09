import { combineReducers, configureStore } from '@reduxjs/toolkit'
import jotters from './jotterSlice'
import notes from './noteSlice'
import info from './infoSlice'
import auth from './authSlice'
import publicNotes from './publicNoteSlice'
import modal from './modalSlice'
import breadcrumbs from './breadcrumbsSlice'
import comments from './commentSlice'

const rootReducer = combineReducers({
  info,
  jotters,
  notes,
  auth,
  publicNotes,
  modal,
  breadcrumbs,
  comments
})

function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}

export default createStore
