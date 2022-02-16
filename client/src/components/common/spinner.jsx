import React from 'react'

const Spinner = () => {
  return (
    <div className="w-100 text-center my-5">
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Spinner
