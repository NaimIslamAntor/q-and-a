const express = require('express')
const router = express.Router()

const { registerPage, loginPage, register, login, logout } = require('../controllers/authControllers')

const { registerValidation, authenticated, unAuthenticated } = require('../middlewares/auth')

//for registration
router.route('/register').get(authenticated, registerPage).post(authenticated, registerValidation, register)


//for login

router.route('/login').get(authenticated, loginPage).post(authenticated, login)


router.route('/logout').post(unAuthenticated, logout)

module.exports = router