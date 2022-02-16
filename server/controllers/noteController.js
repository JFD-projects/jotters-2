const mongoose = require('mongoose')
const JotterModel = require('../models/JotterModel')
const NoteModel = require('../models/NoteModel')
const errorService = require('../services/errorService')

exports.fetchAll = async (req, res) => {
  try {
    const {jotterId} = req.query

    if (!mongoose.Types.ObjectId.isValid(jotterId)) {
      return errorService.handleError(res, 400, 'INVALID_ID')
    }

    const jotter = await JotterModel.findById(jotterId)

    if (jotter.userId.toString() !== req.user._id) {
      return errorService.handleError(res, 401, 'UNAUTHORIZED')
    }

    const list = await NoteModel.find({jotterId})
    res.status(200).send(list.length > 0 ? list : null)

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

    await updateJotterStatistic(jotterId)

    res.status(201).send(newNote)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}

exports.patch = async (req, res) => {
  try {
    const {noteId} = req.params

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return errorService.handleError(res, 400, 'INVALID_ID')
    }

    const updatedNote = await NoteModel.findById(noteId)

    if (updatedNote === null) {
      return errorService.handleError(res, 404, 'NOTE_NOT_FOUND')
    }

    const jotter = await JotterModel.findById(updatedNote.jotterId)

    if (jotter === null) {
      return errorService.handleError(res, 404, 'JOTTER_NOT_FOUND')
    }

    if (jotter.userId.toString() !== req.user._id) {
      return errorService.handleError(res, 401, 'UNAUTHORIZED')
    }

    // await updatedNote.updateOne(req.body, {new: true})
    const changedNote = await NoteModel.findByIdAndUpdate(noteId, req.body, {new: true})

    await updateJotterStatistic(jotter._id)

    res.status(200).send(changedNote)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}

exports.delete = async (req, res) => {
  try {
    const {noteId} = req.params

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return errorService.handleError(res, 400, 'INVALID_ID')
    }

    const deletedNote = await NoteModel.findById(noteId)

    if (deletedNote === null) {
      return errorService.handleError(res, 404, 'NOTE_NOT_FOUND')
    }

    const jotter = await JotterModel.findById(deletedNote.jotterId)

    if (jotter === null) {
      return errorService.handleError(res, 404, 'JOTTER_NOT_FOUND')
    }

    if (jotter.userId.toString() !== req.user._id) {
      return errorService.handleError(res, 401, 'UNAUTHORIZED')
    }

    await deletedNote.deleteOne()

    await updateJotterStatistic(jotter._id)

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
