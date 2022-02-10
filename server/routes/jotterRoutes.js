const express = require('express')
const auth = require('../middleware/authMiddleware')
const jotterController = require('../controllers/jotterController')

const router = express.Router({mergeParams: true})

router.route('/')
      .get(auth, jotterController.fetch)
      .post(auth, jotterController.post)

router.route('/:jotterId')
      .patch(auth, jotterController.patch)
      .delete(auth, jotterController.delete)

module.exports = router
