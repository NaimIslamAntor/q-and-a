const { DataTypes, Model } = require('sequelize')
const {sequelize} = require('../config/db')
const questionModel = require('./questionModel')
const answerModel = require('./answerModel')

//model initialization
class User extends Model{}


User.init({
    name:{
        type: DataTypes.STRING
    },
    userName: {
        type: DataTypes.STRING,
        unique: true,
    },
    password:{
        type: DataTypes.STRING
    },
    
},

{
    sequelize,
    modelName: 'User'
})


User.hasMany(questionModel, {as: 'question', foreignKey: 'userId'})

questionModel.belongsTo(User);

User.hasMany(answerModel, {as: 'answer', foreignKey: 'userId'})

answerModel.belongsTo(User);

// User.hasMany(questionModel, {as: 'question'})


// sync()
const sync = async () => {
    try {
        await User.sync({force: true})
        console.log("Users table created successfully")
    } catch (error) {
        console.log(error.message)
    }
}

// sync()

module.exports = User