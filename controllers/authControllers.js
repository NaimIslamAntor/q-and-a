const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const passport = require('passport')

//regsiterPage renders view of register

const registerPage = async (req, res) => {
    res.render('register')
}


//register an user
const register = async (req, res) => {

    const { name, username, password } = req.body

    const sault = await bcrypt.genSalt(15)

    const hashPassword = await bcrypt.hash(password, sault)

    await userModel.create({
        name,
        userName: username,
        password: hashPassword,
    })


    req.flash('successMessage', 'Registration successfull please login')

    res.redirect('/login')
}


// render login view
const loginPage = (req, res) => {
    res.render('login')
}


//loggedin user
const login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next)
}



//logged an user out
const logout = (req, res) => {

  req.logout()

  res.redirect('/login')

}


module.exports = { registerPage, loginPage, register, login, logout }