const express = require('express')
const auth = require('../middleware/authMiddleware')
const commentController = require('../controllers/commentController')

const router = express.Router({mergeParams: true})

router.route('/')
      .get(commentController.fetch)
      .post(auth, commentController.post)

router.delete('/:commentId', auth, commentController.delete)

module.exports = router
