import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import JottersLayout from '../components/layouts/jottersLayout'
import NotesLayout from '../components/layouts/notesLayout'
import Error404 from '../components/common/error404'
import InfoLayout from '../components/layouts/infoLayout'
import PublicNotesLayout from '../components/layouts/publicNotesLayout'
import PublicNoteLayout from '../components/layouts/publicNoteLayout'

const Routing = () => {
  return (

    <Switch>
      <Route path="/404"><Error404/></Route>

      <Route path={[
        '/info/login',
        '/info/register',
        '/info/profile',
        '/info/logout',
        '/info']}><InfoLayout/></Route>

      <Route path={[
        '/public/login',
        '/public/register',
        '/public/profile',
        '/public/logout'
      ]}><PublicNotesLayout/></Route>

      <Route path={[
        '/public/:noteId/login',
        '/public/:noteId/register',
        '/public/:noteId/profile',
        '/public/:noteId/logout',
        '/public/:noteId'
      ]}><PublicNoteLayout/></Route>

      <Route path="/public"><PublicNotesLayout/></Route>

      <Route path="/jotters/:jotterId/:noteId?"><NotesLayout/></Route>
      <Route path="/jotters" exact><JottersLayout/></Route>

      <Redirect exact from="/" to="/info"/>
      {/*<Redirect to="/404"/>*/}
    </Switch>

  )
}

export default Routing
