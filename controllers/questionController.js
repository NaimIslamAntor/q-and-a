const { nanoid } = require('nanoid')

const questionModel = require('../models/questionModel')
const User = require('../models/userModel')
const Answer = require('../models/answerModel')

const { paginationPageDefiner } = require('../config/utils')



//for home page
const homePage = async (req, res) => {

    //limit 
    const limit = 10
    const page = parseInt(req.query.page) || 0

    const offset = page * limit

    try {
        
    const questions = await questionModel.findAll({
        include: User,
        limit,
        offset,
        order: [
               ['createdAt', 'DESC']
       ] })

    const pages = await paginationPageDefiner(questionModel, limit, page)

    console.log(pages)

   res.render('index', { questions, pages })

    } catch (error) {
        res.send(`${error.message} wrong happend`)
    }
}

//for posting questions
const postQuestions = async (req, res) => {

    const { questionName, questionBody } = req.body

     //validation
     if (!questionName) {
        req.flash('error', 'Please enter your question')
        return res.redirect('/')
    }

    let questionSlug = questionName.replace(/ /g,"-") + nanoid(5)
    questionSlug = questionSlug.toLowerCase()

    try {

    await questionModel.create({
        userId: req.user.id,
        questionName,
        questionSlug,
        questionBody,
    })

    req.flash('successMessage', 'Question added successfully')

    res.redirect('/')

    } catch (error) {
        console.log(error.message)
        res.send("Something wen wrong")
    }
}




const questionPage = async (req, res) => {

    const { slug } = req.params

    try {
        const question = await questionModel.findOne({where: {questionSlug: slug}, include: User,})

        if (!question) {
            return res.send('Question not found')
        }
    
        const answers = await Answer.findAndCountAll(
            {where: {questionId: question.id},
             include: User,
              order: [
                 ['createdAt', 'DESC'] ] })
    
        // console.log(answers.count, answers.rows)
    
        res.render('question', {question, answers})

    } catch (error) {
        res.send(error.message)
    }
}


//post answers

const postAnswer = async (req, res) => {

    const {questionId, answer} = req.body

    const back = req.header('Referer')
  

    console.log(req.body)
    if (!questionId || !answer) {

        req.flash('error', 'Please Enter required field')

        return res.redirect(back)

    }


    try {
        

    const question = await questionModel.findByPk(questionId)

    if (!question) {
        return res.send('Question not found')
    }


    await Answer.create({
        userId: req.user.id,
        questionId,
        answer,
    })

    req.flash('successMessage', 'Answer created successfully')

    res.redirect(back)

    } catch (error) {
        res.send('Something went wrong')
    }

}

module.exports = { homePage, postQuestions, questionPage, postAnswer }





//for home page
// const homePage = async (req, res) => {

//     const questions = await questionModel.findAll({
//          include: User,
//          limit: 10,
//          order: [
//                 ['createdAt', 'DESC']
//         ] })

//     res.render('index', { questions })
// }


// const paginationPageDefiner = async (limit=10, page) => {

//     const totalQuestion = await questionModel.count()

//     const numOfPages = Math.ceil(totalQuestion / limit) - 1

//     const pages = {
//         prev: null,
//         next: null,
//     }

//     //sets prev page
//     if (page > 0) {
//         pages.prev = page - 1
//     }

//     //sets next page
//     if (page < numOfPages) {
//         pages.next = page + 1
//     }


//     return pages
// }