import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import InfoSidebar from '../pages/sidebar/infoSidebar'
import Layout from './common/layout'
import Note from '../pages/main/common/note'
import { useTranslation } from 'react-i18next'
import { loadInfoNote, getInfoNote, getInfoNotesLoadingStatus } from '../../store/infoSlice'
import Spinner from '../common/spinner'
import { getCurrentUser } from '../../store/authSlice'
import { updateBreadcrumbs } from '../../store/breadcrumbsSlice'
import { INFO_BREADCRUMBS } from '../../utils/helpers'


const InfoLayout = () => {
  const {i18n} = useTranslation()
  const dispatch = useDispatch()
  const infoNote = useSelector(getInfoNote())
  const infoNoteIsLoading = useSelector(getInfoNotesLoadingStatus())
  const isAdmin = useSelector(getCurrentUser())?.isAdmin

  useEffect(() => {
    dispatch(loadInfoNote(i18n.language))
  }, [i18n.language])

  useEffect(() => {
    dispatch(updateBreadcrumbs(INFO_BREADCRUMBS))
  }, [])

  return (
    <Layout>
      <InfoSidebar/>

      {infoNoteIsLoading
        ? <Spinner/>

        : <Note note={infoNote}
                type="INFO"
                isAdmin={isAdmin}/>
      }
    </Layout>
  )
}

export default InfoLayout
