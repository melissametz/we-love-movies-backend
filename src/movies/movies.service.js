const knex = require("../db/connection");

const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  c_critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  c_created_at: "critic.created_at",
  c_updated_at: "critic.updated_at",
});


function playingInTheaters(){
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id") 
    .distinct("m.*")
    .where({ "mt.is_showing": true });

}

function list(){
  return knex("movies")
     .select("*")
}

function read(movie_id){
  return knex("movies")
      .select("*")
      .where({movie_id: movie_id})
      .first()
   }


function readTheatersByMovie(movie_id){
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.movie_id", "mt.is_showing")
    .where({ "mt.movie_id": movie_id });
};

const readReviewsByMovie = movie_id => {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movie_id })
    .then(reviews => reviews.map(review => addCritic(review)));
};
  
module.exports = {
  playingInTheaters,
  list,
  read,
  readTheatersByMovie,
  readReviewsByMovie
  }
