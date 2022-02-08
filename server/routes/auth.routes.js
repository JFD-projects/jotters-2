const express = require('express')

const router = express.Router({mergeParams: true})

router.post('/register', async (req, res) => {
  res.status(404).json({
    status: 'Fail',
    message: 'Error: ROUT NOT READY'
  })
})

router.post('/login', async (req, res) => {
  res.status(404).json({
    status: 'Fail',
    message: 'Error: ROUT NOT READY'
  })
})

router.post('/token', async (req, res) => {
  res.status(404).json({
    status: 'Fail',
    message: 'Error: ROUT NOT READY'
  })
})

module.exports = router
