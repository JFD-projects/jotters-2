const mongoose = require('mongoose')
const errorService = require('../services/errorService')
const UserModel = require('../models/UserModel')

exports.fetch = async (req, res) => {
  try {
    const list = await UserModel.find()

    res.status(200).send(list)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}

exports.get = async (req, res) => {
  try {
    const {userId} = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return errorService.handleError(res, 400, 'INVALID_ID')
    }

    const user = await UserModel.findById(userId)

    if (user === null) {
      return errorService.handleError(res, 404, 'USER_NOT_FOUND')
    }

    res.status(200).send(user)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}

exports.patch = async (req, res) => {
  try {
    const {userId} = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return errorService.handleError(res, 400, 'INVALID_ID')
    }

    if (userId !== req.user._id) {
      return errorService.handleError(res, 401, 'UNAUTHORIZED')
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, req.body, {new: true})
    res.status(200).send(updatedUser)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}
