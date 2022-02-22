import errorServiceOld from '../services/errorServiceOld'
import userService from '../services/userService'

const useUsers = () => {
  const {handleError} = errorServiceOld()

  const fetchUsers = async () => {
    try {
      const {data} = await userService.fetchAll()
      return data
    } catch (err) {
      handleError(err)
    }
  }

  const getCurrentUser = async () => {
    try {
      const {data} = await userService.getById('619032cad8df581c4881d9a2')
      return data
    } catch (err) {
      handleError(err)
    }
  }

  return {fetchUsers, getCurrentUser}
}

export default useUsers
