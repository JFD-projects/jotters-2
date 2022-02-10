const mongoose = require('mongoose')
const JotterModel = require('../models/JotterModel')
const NoteModel = require('../models/NoteModel')
const errorService = require('../services/errorService')

exports.fetch = async (req, res) => {
  try {
    const {jotterId} = req.query

    if (!mongoose.Types.ObjectId.isValid(jotterId)) {
      return errorService.handleError(res, 400, 'INVALID_ID')
    }

    const jotter = await JotterModel.findById(jotterId)

    if (jotter.userId.toString() !== req.user._id) {
      return errorService.handleError(res, 401, 'UNAUTHORIZED')
    }

    let list = await NoteModel.find({jotterId})
    res.status(200).send(list)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}

exports.post = async (req, res) => {
  try {
    const {jotterId} = req.body

    if (!mongoose.Types.ObjectId.isValid(jotterId)) {
      return errorService.handleError(res, 400, 'INVALID_ID')
    }

    const jotter = await JotterModel.findById(jotterId)

    if (jotter.userId.toString() !== req.user._id) {
      return errorService.handleError(res, 401, 'UNAUTHORIZED')
    }

    const newNote = await NoteModel.create(req.body)

    await updateJotterStatistic()

    res.status(201).send(newNote)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}

exports.patch = async (req, res) => {
  try {
    const {jotterId} = req.body
    const {noteId} = req.params

    if (!mongoose.Types.ObjectId.isValid(jotterId) || !mongoose.Types.ObjectId.isValid(noteId)) {
      return errorService.handleError(res, 400, 'INVALID_ID')
    }

    const jotter = await JotterModel.findById(jotterId)

    if (jotter.userId.toString() !== req.user._id) {
      return errorService.handleError(res, 401, 'UNAUTHORIZED')
    }

    const updatedNote = await NoteModel.findByIdAndUpdate(noteId, req.body, {new: true})

    await updateJotterStatistic(jotterId)

    res.status(200).send(updatedNote)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}

exports.delete = async (req, res) => {
  try {
    const {jotterId} = req.body
    const {noteId} = req.params

    if (!mongoose.Types.ObjectId.isValid(jotterId) || !mongoose.Types.ObjectId.isValid(noteId)) {
      return errorService.handleError(res, 400, 'INVALID_ID')
    }

    const jotter = await JotterModel.findById(jotterId)

    if (jotter.userId.toString() !== req.user._id) {
      return errorService.handleError(res, 401, 'UNAUTHORIZED')
    }

    await NoteModel.findByIdAndDelete(noteId)

    await updateJotterStatistic(jotterId)

    res.status(204).send(null)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}

async function updateJotterStatistic(jotterId) {
  const notes = await NoteModel.find({jotterId})

  const hasPublicNote = notes.reduce((acc, n) => (acc || n.isPublic), false)
  const notesNumber = notes.length

  await JotterModel.findByIdAndUpdate(jotterId, {hasPublicNote, notesNumber}, {new: true})
}
