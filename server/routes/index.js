const express = require('express')

const router = express.Router({mergeParams: true})

router.use('/auth', require('./authRoutes'))
router.use('/comment', require('./commentRoutes'))
router.use('/jotter', require('./jotterRoutes'))
router.use('/note', require('./noteRoutes'))
router.use('/info', require('./infoRoutes'))
router.use('/publicNote', require('./publicNoteRoutes'))
router.use('/user', require('./userRoutes'))

module.exports = router
