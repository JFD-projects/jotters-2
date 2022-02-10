const express = require('express')
const auth = require('../middleware/authMiddleware')
const noteController = require('../controllers/noteController')

const router = express.Router({mergeParams: true})

router.route('/')
      .get(auth, noteController.fetch)
      .post(auth, noteController.post)

router.route('/:noteId')
      .patch( auth, noteController.patch)
      .delete(auth, noteController.delete)

module.exports = router
