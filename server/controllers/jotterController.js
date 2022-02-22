const mongoose = require('mongoose')
const JotterModel = require('../models/JotterModel')
const errorService = require('../services/errorService')

exports.fetch = async (req, res) => {
  try {
    const list = await JotterModel.find({userId: req.user._id})

    res.status(200).send(list)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}

exports.post = async (req, res) => {
  try {
    const newJotter = await JotterModel.create({
      ...req.body,
      userId: req.user._id
    })

    res.status(201).send(newJotter)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}

exports.patch = async (req, res) => {
  try {
    const {jotterId} = req.params

    if (!mongoose.Types.ObjectId.isValid(jotterId)) {
      return errorService.handleError(res, 400, 'INVALID_ID')
    }

    const jotter = await JotterModel.findById(jotterId)

    if (jotter.userId.toString() !== req.user._id) {
      return errorService.handleError(res, 401, 'UNAUTHORIZED')
    }

    await jotter.update(req.body, {new: true})

    const updatedJotter = await JotterModel.findById(jotterId)

    res.status(200).send(updatedJotter)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}

exports.delete = async (req, res) => {
  try {
    const {jotterId} = req.params

    if (!mongoose.Types.ObjectId.isValid(jotterId)) {
      return errorService.handleError(res, 400, 'INVALID_ID')
    }

    const deletedJotter = await JotterModel.findById(jotterId)

    if (deletedJotter.userId.toString() !== req.user._id) {
      return errorService.handleError(res, 401, 'UNAUTHORIZED')
    }

    await deletedJotter.deleteOne()

    res.status(204).send(null)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}
