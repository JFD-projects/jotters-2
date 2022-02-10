const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router({mergeParams: true})

router.post('/register', authController.register)

router.post('/login', authController.login)

router.post('/token', authController.token)

module.exports = router
