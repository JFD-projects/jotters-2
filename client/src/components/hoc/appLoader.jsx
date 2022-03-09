import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadCurrentUser, getLoadingStatus } from '../../store/authSlice'
import Spinner from '../common/spinner'

const AppLoader = ({children}) => {
  const dispatch = useDispatch()
  const isLoadingAuth = useSelector(getLoadingStatus())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    dispatch(loadCurrentUser())
  }, [])

  useEffect(() => {
    // Spinner should be render only once - when application start
    if (!isLoadingAuth) {
      setIsLoading(false)
    }
  }, [isLoadingAuth])

  if (isLoading) {
    return <Spinner/>
  }

  return children
}

export default AppLoader
