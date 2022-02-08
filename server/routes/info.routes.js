const express = require('express')
const InfoModel = require('../models/InfoModel')

const router = express.Router({mergeParams: true})

router.get('/:lng', async (req, res) => {
  try {
    const data = await InfoModel.findOne({lng: (req.params.lng || 'en')})
    if (data === null) {
      throw new Error("Not found");
    }

    // res.status(200).json(data)
    res.status(200).send({
      status: 'Success',
      data
    })
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: 'Error: Language not found'
    })
  }
})

router.patch('/:lng', async (req, res) => {
  res.status(404).json({
    status: 'Fail',
    message: 'Error: ROUT NOT READY'
  })
})

module.exports = router
