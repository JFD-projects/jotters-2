const express = require('express')

const router = express.Router({mergeParams: true})

router.use('/auth', require('./auth.routes'))
router.use('/comment', require('./comment.routes'))
router.use('/jotter', require('./jotter.routes'))
router.use('/note', require('./note.routes'))
router.use('/info', require('./info.routes'))
router.use('/publicNote', require('./publicNote.routes'))
router.use('/user', require('./user.routes'))

module.exports = router
