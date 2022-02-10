const CommentModel = require('../models/CommentModel')
const errorService = require('../services/errorService')

exports.fetch = async (req, res) => {
  try {
    const {orderBy, equalTo} = req.query

    const list = CommentModel.find({[orderBy]: equalTo})

    res.status(200).send(list)
  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}


exports.post = async (req, res) => {
  try {
    const newComment = await Comment.create({
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
    const deletedComment = CommentModel.findById(commentId)

    if (deletedComment.userId.toString() !== req.user._id) {
      return errorService.handleError(res, 401, 'UNAUTHORIZED')
    }

    await deletedComment.deleteOne()
    res.status(204).send(null)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
}
