const { DataTypes, Model } = require('sequelize')
const {sequelize} = require('../config/db')
const userModel = require('./userModel')
const answerModel = require('./answerModel')
//model initialization
class Question extends Model{}


Question.init({
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
            key: 'id',
        }
    },
    questionName:{
        type: DataTypes.STRING,
    },
    questionSlug: {
        type: DataTypes.STRING,
        unique: true,
    },
    questionBody:{
        type: DataTypes.STRING,
        allowNull: true,
    },
},

{
    sequelize,
    modelName: 'Question'
})


Question.hasMany(answerModel, {foreignKey: 'questionId'})

answerModel.belongsTo(Question);




// sync()
const sync = async () => {
    try {
        await Question.sync({force: true})
        console.log("Users table created successfully")
    } catch (error) {
        console.log(error.message)
    }
}

// sync()

module.exports = Question