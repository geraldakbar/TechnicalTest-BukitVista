const express = require('express');
const app = express();
const movieRouter = require('./routes/movies');
const logger = require('./middleware/logger');
const bodyParser = require('body-parser');
const db = require('./models')
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/movie',movieRouter)
app.get('/test',(req,res)=>{
    logger.info("The first api")
    res.send("Hello")
})

db.sequelize.authenticate().then(() => {
    logger.info('Connection has been established successfully.');
}).catch((error) => {    
    console.error('Unable to connect to the database: ', error);
 });
 
db.sequelize.sync().then(() => {
    app.listen(port, ()=>{
        logger.info("The server is running")
    })
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });
