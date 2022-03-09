import { toast } from 'react-toastify'

const errorService = {
  handleError: (err) => {
    let error
    if (err.response?.data) {
      error = 'Status ' + err.response.status + '. ' + err.response.data.message
    } else {
      error = err.message
    }

    // =========================
    console.log('error:', error)
    // =========================
    toast.error(error)
  }
}

export default errorService
