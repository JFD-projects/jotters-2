const jwt = require('jsonwebtoken')
const configFile = require('config')
const TokenModel = require('../models/TokenModel')

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, configFile.get('jwtAccessKey'), {expiresIn: configFile.get('tokenExpiresIn')})
    const refreshToken = jwt.sign(payload, configFile.get('jwtRefreshKey'))

    return {
      accessToken,
      refreshToken,
      expiresIn: configFile.get('tokenExpiresIn')
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
      return jwt.verify(refreshToken, configFile.get('jwtRefreshKey'))
    } catch (err) {
      return null
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, configFile.get('jwtAccessKey'))
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
