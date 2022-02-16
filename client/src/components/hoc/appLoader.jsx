import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadCurrentUser, getLoadingStatus } from '../../store/authSlice'
import Spinner from '../common/spinner'

const AppLoader = ({children}) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getLoadingStatus())

  useEffect(() => {
    dispatch(loadCurrentUser())
  }, [])

  if (isLoading) {
    return <Spinner/>
  }

  return children
}

export default AppLoader
