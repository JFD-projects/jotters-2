function handleError(res, code, message) {
  return res.status(code).json({message})
}

module.exports = {
  handleError
}
