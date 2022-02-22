const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')

const {generateUserData} = require('../utils/helper')
const UserModel = require('../models/UserModel')
const tokenService = require('../services/tokenService')
const errorService = require('../services/errorService')

exports.register = [
  check('email', 'INVALID_EMAIL').isEmail(),
  check('password', 'PASSWORD_MIN_LENGTH_8').isLength({min: 8}),

  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return errorService.handleError(res, 400, errors.array()[0].msg) // VALIDATION ERROR
      }

      const {email, password} = req.body

      const existingUser = await UserModel.findOne({email})
      if (existingUser) {
        return errorService.handleError(res, 401, 'EMAIL_EXISTS')
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = await UserModel.create({
        ...generateUserData(),
        ...req.body,
        password: hashedPassword
      })

      const tokens = tokenService.generate({_id: newUser._id})
      await tokenService.save(newUser._id, tokens.refreshToken)

      res.status(201).send({...tokens, userId: newUser._id})

    } catch (err) {
      errorService.handleError(res, 500, 'SERVER_ERROR')
    }
  }
]

exports.login = [
  check('email', 'INVALID_EMAIL').normalizeEmail().isEmail(),
  check('password', 'EMPTY_PASSWORD').exists(),

  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return errorService.handleError(res, 401, errors.array()[0].msg) // VALIDATION ERROR
      }

      const {email, password} = req.body

      const existingUser = await UserModel.findOne({email}).select('+password')
      if (!existingUser) {
        return errorService.handleError(res, 401, 'EMAIL_NOT_FOUND')
      }

      const isPasswordsMatch = await bcrypt.compare(password, existingUser.password)

      if (!isPasswordsMatch) {
        return errorService.handleError(res, 401, 'INVALID_PASSWORD')
      }

      const tokens = tokenService.generate({_id: existingUser._id})
      await tokenService.save(existingUser._id, tokens.refreshToken)

      res.status(200).send({...tokens, userId: existingUser._id})

    } catch (err) {
      errorService.handleError(res, 500, 'SERVER_ERROR')
    }
  }
]

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken.userId?.toString()
}

exports.token = async (req, res) => {
  try {
    const {refreshToken} = req.body
    const data = tokenService.validateRefresh(refreshToken)
    const dbToken = await tokenService.findToken(refreshToken)

    if (isTokenInvalid(data, dbToken)) {
      return errorService.handleError(res, 401, 'UNAUTHORIZED')
    }

    const tokens = tokenService.generate({_id: data._id})

    await tokenService.save(data._id, tokens.refreshToken)

    res.status(200).send({...tokens, userId: data._id})

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}
