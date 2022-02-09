const express = require('express')
const errorService = require('../services/error.service')

const router = express.Router({mergeParams: true})

router.post('/', async (req, res) => {
  try {

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
})

router.patch('/:id', async (req, res) => {
  try {

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
})

router.get('/:id', async (req, res) => {
  try {

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
})

module.exports = router
