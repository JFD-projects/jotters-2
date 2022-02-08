const express = require('express')

const router = express.Router({mergeParams: true})

router.get('/', async (req, res) => {
  res.status(404).json({
    status: 'Fail',
    message: 'Error: ROUT NOT READY'
  })
})

router.post('/', async (req, res) => {
  res.status(404).json({
    status: 'Fail',
    message: 'Error: ROUT NOT READY'
  })
})

router.patch('/:id', async (req, res) => {
  res.status(404).json({
    status: 'Fail',
    message: 'Error: ROUT NOT READY'
  })
})

router.delete('/:id', async (req, res) => {
  res.status(404).json({
    status: 'Fail',
    message: 'Error: ROUT NOT READY'
  })
})

module.exports = router
