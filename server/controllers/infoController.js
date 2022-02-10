const InfoModel = require('../models/InfoModel')
const errorService = require('../services/errorService')
const UserModel = require('../models/UserModel')

exports.get = async (req, res) => {
  try {
    const {lng} = req.params
    const data = await InfoModel.findOne({lng})
    if (data === null) {
      return errorService.handleError(res, 404, 'LNG_NOT_FOUND')
    }

    res.status(200).send(data)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}

exports.patch = async (req, res) => {
  try {
    const {lng} = req.params

    const user = await UserModel.findById(req.user._id)

    if (!user.isAdmin) {
      return errorService.handleError(res, 401, 'NO_PERMISSIONS')
    }

    const updatedInfoNote = await InfoModel.findOneAndUpdate({lng}, req.body, {new: true})
    res.status(200).send(updatedInfoNote)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}
