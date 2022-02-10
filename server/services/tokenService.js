const jwt = require('jsonwebtoken')
const config = require('config')
const TokenModel = require('../models/TokenModel')

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get('jwtAccessKey'), {expiresIn: '1h'})
    const refreshToken = jwt.sign(payload, config.get('jwtRefreshKey'))

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600
    }
  }

  async save(userId, refreshToken) {
    const data = await TokenModel.findOne({userId})
    if (data) {
      data.refreshToken = refreshToken
      return data.save()
    }

    const token = await TokenModel.create({
      userId,
      refreshToken
    })

    return token
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get('jwtRefreshKey'))
    } catch (err) {
      return null
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get('jwtAccessKey'))
    } catch (err) {
      return null
    }
  }

  async findToken(refreshToken) {
    try {
      return await TokenModel.findOne({refreshToken})
    } catch (err) {
      return null
    }
  }
}

module.exports = new TokenService()
