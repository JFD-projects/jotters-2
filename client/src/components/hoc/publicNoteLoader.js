import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLoadingStatus, loadPublicNotes } from '../../store/publicNoteSlice'
import Spinner from '../common/spinner'

const PublicNoteLoader = ({children}) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getLoadingStatus())

  useEffect(() => {
    dispatch(loadPublicNotes())
  }, [])

  if (isLoading) {
    return <Spinner/>
  }

  return children
}

export default PublicNoteLoader
