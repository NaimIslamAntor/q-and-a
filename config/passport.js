const LocalStrategy = require('passport-local').Strategy
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')


const passportLocalLogin = (passport) => {
    passport.use(
        new LocalStrategy({usernameField: 'username'}, async (email, password, done) => {

           try {

            const user = await userModel.findOne({where: {userName: email}})

            if (!user) {
                return done(null, false, {message: 'User doesnot exist'})
            }

            if (!await bcrypt.compare(password, user.password)) {
                return done(null, false, {message: 'Password incorrect'})
            }

            return done(null, user)


           } catch (error) {
               return done(error, false, {message: error.message})
           }


        })
    )


    passport.serializeUser((user, done) => {
        done(null, user.id)
    })


    passport.deserializeUser(async (id, done) => {

       try {

        const user = await userModel.findByPk(id)
        done(null, user)

       } catch (error) {

        done(error, false)

       }
    })
}


module.exports = passportLocalLogin


