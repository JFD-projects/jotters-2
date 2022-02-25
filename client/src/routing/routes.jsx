import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import JottersLayout from '../components/layouts/jottersLayout'
import NotesLayout from '../components/layouts/notesLayout'
import Error404 from '../components/common/error404'
import InfoLayout from '../components/layouts/infoLayout'
import PublicNotesLayout from '../components/layouts/publicNotesLayout'
import PublicNoteLayout from '../components/layouts/publicNoteLayout'
import ProtectedRoute from './protectedRoute'

const Routes = () => {
  return (
    <Switch>
      <Route path="/info"><InfoLayout/></Route>

      <Route path="/public/:noteId"><PublicNoteLayout/></Route>

      <Route path="/public"><PublicNotesLayout/></Route>

      <ProtectedRoute path="/jotters/:jotterId/:noteId?"><NotesLayout/></ProtectedRoute>

      <ProtectedRoute path="/jotters" exact><JottersLayout/></ProtectedRoute>

      <Route path="/404"><Error404/></Route>

      <Redirect exact from="/" to="/info"/>

      <Redirect to="/404"/>
    </Switch>
  )
}

export default Routes
