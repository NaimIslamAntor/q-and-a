const { DataTypes, Model } = require('sequelize')
const {sequelize} = require('../config/db')



//model initialization
class Answer extends Model{}


Answer.init({
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'Users',
            key: 'id',
        }
    },
    questionId: {
        type: DataTypes.UUID,
        references: {
            model: 'Questions',
            key: 'id',
        }
    },
    answer:{
        type: DataTypes.TEXT,
    },
},

{
    sequelize,
    modelName: 'Answer'
})


// sync()
const sync = async () => {
    try {
        await Answer.sync({force: true})
        console.log("Answer table created successfully")
    } catch (error) {
        console.log(error.message)
    }
}

// sync()

module.exports = Answer