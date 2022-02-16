// import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const errorServiceOld = () => {
  // const [error, setError] = useState()
  //
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error)
  //     setError(null)
  //   }
  // }, [error])

  // const handleError = (err) => {
  //   if (err.response?.data) {
  //     err.message = 'Status ' + err.response.data.status + '. ' + err.response.data.message
  //   }
  //   setError(err.message)
  // }

  const handleError = (err) => {
    let error
    if (err.response?.data) {
      error = 'Status ' + err.response.data.status + '. ' + err.response.data.message
    } else {
      error = err.message
    }
    toast.error(error)
  }

  return {handleError}
}

export default errorServiceOld
