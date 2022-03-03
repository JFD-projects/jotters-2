const express = require('express')
const auth = require('../middleware/authMiddleware')
const commentController = require('../controllers/commentController')

const router = express.Router({mergeParams: true})

router.get('/', commentController.fetch)

router.route('/')
    .get(commentController.fetch)
    .post(auth, commentController.post)

router.route('/:commentId')
    .patch(auth, commentController.patch)
    .delete(auth, commentController.delete)

module.exports = router
