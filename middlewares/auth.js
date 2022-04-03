const userModel = require('../models/userModel')


const registerValidation = async (req, res, next) => {
    const { name, username, password, confirmPassword } = req.body

    const errors = []

    //check all fields are written
 
    if (!name) {
        errors.push('Name is required')
    }

    
    if (!username) {
        errors.push('Username is required')
    }

    
    if (!password) {
        errors.push('Password is required')
    }

    
    if (!confirmPassword) {
        errors.push('Confirm Password is required')
    }


    //check password and confirm password are matched
    if (password !== confirmPassword) {
        errors.push('Password and confirm password not matched')
    }


    //check the password at least 6 characters long
    if (password?.length < 6) {
        errors.push('Password must be at least 6 character long')
    }


    const findUser = await userModel.findOne({where: {userName: username}})

    if (findUser) {
        errors.push('Username is taken try something else!')
    }



    if (errors.length) {
       return res.render('register', {
            errors,
            name,
            username,
            password,
            confirmPassword,
        })}

        next()

}


//checks user is authenticated or not
const authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    next()
}



//checks user is unauthenticated or not
const unAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }

    next()
}



module.exports = { registerValidation, authenticated, unAuthenticated }