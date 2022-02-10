const mongoose = require('mongoose')
const NoteModel = require('../models/NoteModel')
const JotterModel = require('../models/JotterModel')
const UserModel = require('../models/UserModel')
const errorService = require('../services/errorService')

exports.fetch = async (req, res) => {
  try {
    let notes = await NoteModel.find({isPublic: true})

    const notesPromises = notes.map(async note => {
      const jotter = await JotterModel.findById(note.jotterId).select('userId')
      const user = await UserModel.findById(jotter.userId).select('name')
      return {
        ...note,
        ...jotter,
        ...user
      }
    })
    notes = await Promise.all(notesPromises)

    res.status(200).send(notes)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}

exports.get = async (req, res) => {
  try {
    const {noteId} = req.params

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return errorService.handleError(res, 400, 'INVALID_ID')
    }

    const note = await NoteModel.findById(noteId)

    if (note.isPublic === false) {
      return errorService.handleError(res, 401, 'UNAUTHORIZED')
    }

    res.status(200).send(note)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}
