const path = require('path')
const { Sequelize } = require('sequelize')


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', '/db.sqlite3')
})

async function connDB(){
  
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = { connDB, sequelize }