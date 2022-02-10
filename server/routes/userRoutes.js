const express = require('express')
const userController = require('../controllers/userController')
const auth = require('../middleware/authMiddleware')

const router = express.Router({mergeParams: true})

router.get('/', auth, userController.fetch)

router.route('/:userId')
      .get(userController.get)
      .patch(auth, userController.patch)

module.exports = router
