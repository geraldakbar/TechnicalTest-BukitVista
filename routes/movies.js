const express = require('express');
const logger = require('../middleware/logger');
const router = express.Router();
const models = require('../models');
const axios = require('axios');
const {Op} = require('sequelize');
const sequelize = require('../services/db');
const { NOW } = require('sequelize');

router.get('/',(req,res)=>{
    res.send({"Forbidden": "Acsess not Allowed"});
});

router.get('/:movie_title',(req,res)=>{
    var mv_title = req.params.movie_title;
    axios.get(`http://www.omdbapi.com/?t=${mv_title}&apikey=1a6b3ce6`).then((resp)=>{
        logger.info(`Sucsessfully fetched movie poster for ${mv_title}`)
        var data = resp.data;

        res.send({"Poster":data.Poster})
    })
});


router.get('/user/:id/favorite',(req,res)=>{
    // asuming that the id of the user is sent in the URL of the api
    var id = req.params.id
    models.favorite_movies.findAll({
        attributes:['title'],
            where:{
                user_id:{
                    [Op.eq]:id
                }
            }
    }).then((movies)=>{
        var movies_copy = movies;
       
        async function getPoster(){
            // result doesn't have a new value of 'poster'
            const result = await Promise.all(movies.map(async (movie)=>{
                logger.info(`getting poster for ${movie.title}`)
    
                /*
                var poster = await axios.get(`http://www.omdbapi.com/?t=${movie.title}&apikey=1a6b3ce6`).then((response)=>{
                    movie['poster'] = response.data.Poster
                    return response.data.Poster;
                })*/
                var poster = await getURL(movie.title);
                movie['poster'] = poster;
                logger.info(poster);
                return ({"title":movie.title,"poster":poster});
            
            }));
            
            
            res.send((result));
        }
        getPoster();
        
    })
});

router.post('/favorite/:id/:title',(req,res)=>{
    var id_user = req.params.id;
    var mv_title = req.params.title;

    logger.info(req.body);

    sequelize.transaction().then(function(t) {
        models.favorite_movies.create({
            id: id_user + Math.random(),
            title: mv_title,
            user_id:1
        }, {
            transaction: t
        }).then(function() {
            t.commit();
        }).catch(function(error) {
            console.log(error);
            t.rollback();
        });
    });
    /*    
    var insert = async ()=>{
        await models.favorite_movies.create({
            title: mv_title,
            user_id:id
        })
        logger.info("Insert Success")
    }


    insert();*/


});

async function getURL(movie_title){
    var poster = await axios.get(`http://www.omdbapi.com/?t=${movie_title}&apikey=1a6b3ce6`).then((response)=>{
                    return response.data.Poster;
                })
    return poster;
}

/*
function getURL(movie_title){
    return axios.get(`http://www.omdbapi.com/?t=${movie_title}&apikey=1a6b3ce6`);
}*/

module.exports = router;