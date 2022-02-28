const CommentModel = require('../models/CommentModel')
const UserModel = require('../models/UserModel')
const errorService = require('../services/errorService')
const mongoose = require('mongoose')

exports.fetch = async (req, res) => {
  try {
    const {noteId} = req.query

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return errorService.handleError(res, 400, 'INVALID_ID')
    }

    const comments = await CommentModel.find({noteId})

    const listPromises = comments.map(async c => {
      const user = await UserModel.findById(c.userId).select('name image')
      return {
        _id: c._id,
        content: c.content,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        userName: user.name,
        userImage: user.image
      }
    })
    const list = await Promise.all(listPromises)

    res.status(200).send(list.length > 0 ? list : null)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}

exports.post = async (req, res) => {
  try {
    const newComment = await CommentModel.create({
      ...req.body,
      userId: req.user._id
    })

    res.status(201).send(newComment)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}

exports.delete = async (req, res) => {
  try {
    const {commentId} = req.params
    const deletedComment = await CommentModel.findById(commentId)

    if (deletedComment.userId.toString() !== req.user._id) {
      return errorService.handleError(res, 401, 'UNAUTHORIZED')
    }

    await deletedComment.deleteOne()
    res.status(204).send(null)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}
