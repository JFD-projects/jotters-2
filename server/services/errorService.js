function handleError(res, code, message) {
  return res.status(code).json({
    error: {
      message
    }
  })
}

module.exports = {
  handleError
}
