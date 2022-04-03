
require('dotenv').config()



const path = require('path')
const express = require('express')
const layouts = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')

const passport = require('passport')

require('./config/passport')(passport)

const { connDB } = require('./config/db')





const app = express()
const port = process.env.PORT || 3000

//import routes

const questionRoutes = require('./routes/questionRoutes')
const authRoutes = require('./routes/authRoutes')






//set app necessity
app.set('view engine', 'ejs')
app.set('layout', './layouts/app')


//set middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(layouts)

app.use(cookieParser(process.env.SESSION_SECRET))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 2592000 }
  }));

app.use(flash())
app.use(express.urlencoded({extended: false}))

app.use(passport.initialize())
app.use(passport.session())


//for handling error with flash global vars
app.use(function(req, res, next) {
 
  res.locals.success = req.flash('successMessage')
  res.locals.error = req.flash('error')

  //for auth
  res.locals.User = req.isAuthenticated() ? req.user : null

  next()
})


connDB()
// if(process.env.NODE_ENV === 'development'){
//   //database connection check
// connDB()

// }


app.use('/', questionRoutes)
app.use('/', authRoutes)



app.listen(port, () => console.log('Server running'))