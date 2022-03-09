const tokenService = require('../services/tokenService')
const errorService = require('../services/errorService')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return errorService.handleError(res, 401, 'TOKEN_REQUIRED')
    }

    const decodedToken = tokenService.validateAccess(token)

    if (decodedToken === null) {
      return errorService.handleError(res, 401, 'INVALID_TOKEN')
    }

    req.user = decodedToken

    next()

  } catch (err) {
    errorService.handleError(res, 401, 'TOKEN_REQUIRED!')
  }
}
