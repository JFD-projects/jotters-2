const express = require('express')
const publicNoteController = require('../controllers/publicNoteController')

const router = express.Router({mergeParams: true})

router.get('/', publicNoteController.fetch)

router.get('/:noteId', publicNoteController.get)

module.exports = router
