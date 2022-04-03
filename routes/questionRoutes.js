const express = require('express')
const router = express.Router()

const { unAuthenticated } = require('../middlewares/auth')

const { homePage, postQuestions, questionPage, postAnswer } = require('../controllers/questionController')

router.route('/').get(homePage).post(unAuthenticated, postQuestions)

router.route('/question/:slug').get(questionPage)

router.route('/answer').post(unAuthenticated, postAnswer)

module.exports = router