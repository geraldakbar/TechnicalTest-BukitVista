const { INTEGER } = require('sequelize');
const {Sequelize, DataTypes} = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
    'heroku_0d7ca0e69c1f6e3',
    'bf5b00a36047e5',
    '2c2e6f2e',
    {
        host: 'us-cdbr-east-06.cleardb.net',
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

const User = sequelize.define("user",{
    user_id :{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    }
});

const Favorite_movie = sequelize.define("favorite_movies",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    id_user:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
});

sequelize.sync().then(() => {
    console.log('');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

module.exports = sequelize;