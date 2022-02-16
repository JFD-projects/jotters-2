import React, {useContext, useEffect, useState} from 'react'

import authService from '../services/authService'
import errorServiceOld from '../services/errorServiceOld'
import localStorageService from '../services/localStorage.service'
import userService from '../services/userService'

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  const {handleError} = errorServiceOld()

  async function getUserData() {
    try {
      const {data} = await userService.getCurrentUser()
      setCurrentUser(data)
    } catch (err) {
      handleError(err)
    }
  }

  useEffect(() => {
    if (localStorageService.getToken() && localStorageService.getCurrentUserId()) {
      getUserData()
    }
  }, [])

  const register = async (user) => {
    try {
      const data = await authService.register(user)
      localStorageService.setToken(data)
      setCurrentUser(data)
    } catch (err) {
      handleError(err)
      const {status, errors} = err.response?.data
      if (status === '400') {
        const errorsObject = {
          name: errors?.name?.message ?? '',
          email: errors?.email?.message ?? '',
          password: errors?.password?.message ?? '',
          passwordConfirm: errors?.passwordConfirm?.message ?? ''
        }
        throw errorsObject
      }
    }
  }

  const login = async (user) => {
    try {
      const data = await authService.login(user)
      localStorageService.setToken(data)
      setCurrentUser(data)
    } catch (err) {
      handleError(err)
      const {status, errors} = err.response.data
      if (status === '401') {
        const errorsObject = {
          email: errors?.email?.message ?? '',
          password: errors?.password?.message ?? '',
        }
        throw errorsObject
      }
    }
  }

  const logout = () => {
    localStorageService.removeAuthData()
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{register, login, logout, currentUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
