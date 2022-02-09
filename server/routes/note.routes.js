const express = require('express')
const errorService = require('../services/error.service')

const router = express.Router({mergeParams: true})

router.get('/', async (req, res) => {
  try {

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
})

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

router.delete('/:id', async (req, res) => {
  try {

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
})

module.exports = router
