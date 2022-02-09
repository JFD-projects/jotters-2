const express = require('express')
const InfoModel = require('../models/InfoModel')
const errorService = require('../services/error.service')

const router = express.Router({mergeParams: true})

router.get('/:lng', async (req, res) => {
  try {
    const data = await InfoModel.findOne({lng: (req.params.lng || 'en')})
    if (data === null) {
      return errorService.handleError(res, 400, 'LNG_NOT_FOUND')
    }

    res.status(200).send(data)

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
})

router.patch('/:lng', async (req, res) => {
  try {

  } catch (err) {
    errorService.handleError(res, 500, 'SERVER_ERROR')
  }
})

module.exports = router
