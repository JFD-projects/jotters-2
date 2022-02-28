const mongoose = require('mongoose')
const NoteModel = require('../models/NoteModel')
const JotterModel = require('../models/JotterModel')
const UserModel = require('../models/UserModel')
const errorService = require('../services/errorService')

exports.fetch = async (req, res) => {
  try {
    let notes = await NoteModel.find({isPublic: true})

    const listPromises = notes.map(async note => {
      const jotter = await JotterModel.findById(note.jotterId).select('userId')
      const user = await UserModel.findById(jotter.userId).select('name image')
      return {
        _id: note._id,
        jotterId: note.jotterId,
        title: note.title,
        content: note.content,
        updatedAt: note.updatedAt,
        userId: jotter.userId,
        userName: user.name,
        userImage: user.image,
      }
    })
    const list = await Promise.all(listPromises)

    res.status(200).send(list.length > 0 ? list : null)

  } catch (err) {
    errorService.handleError(res, 500, err.message)
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
    errorService.handleError(res, 500, err.message)
  }
}
