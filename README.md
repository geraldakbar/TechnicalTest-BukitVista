# TechnicalTest-BukitVista

# Results
- Deployed to heroku app 
  URL: https://bukitvista-takehometest.herokuapp.com/
  Dummy database also in heroku, you can see the credentials at .env file
  
- 2 working GET routes
  1. movie/{movie_title}
    -> returns movie poster
  2. movie/user/{user_id/favorite
    -> returns list of movie posters

- POST Route failure

# Problems

- Unfamiliarity with the requirements especially sequelize and axios,
  Such as using axios to get data, for the favorite movies api took a longer time
  then expected, and ORM concept for sequelize

# Bugs

- Expecting heroku app failure (not certain), because clearDB mysql tends to disconnect
  by itself, I'm not sure how to handle that using sequelize
- POST route always returns 'id cannot be null' although I've tried different approaches such
  as manually inputing the id, not inputting it (it has auto increment constraint)
  
# Notes
- If heroku app failed, pull this repository and run it by usin
  ```
  node index.js
  ```

# Room for improvement
- Get familiar with async/await and Promise in javascript, because that took quite a bit of time
  to learn and solve
