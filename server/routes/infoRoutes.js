const express = require('express')
const infoController = require('../controllers/infoController')
const auth = require('../middleware/authMiddleware')

const router = express.Router({mergeParams: true})

router.route('/:lng')
      .get(infoController.get)
      .patch(auth, infoController.patch)

module.exports = router
