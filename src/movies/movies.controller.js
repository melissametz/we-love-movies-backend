const service = require("./movies.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req,res){
 if(req.query.is_showing){
    res.json({ data: await service.playingInTheaters(true) })
  } else {
    res.json({ data : await service.list()})
  }
}

async function movieIdExist(req,res,next){
  const { movieId } = req.params; 
  const movie = await service.read(movieId);
   
  if(movie){
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, error: "Movie cannot be found"})
}

function read(req,res) {
  res.json({ data: res.locals.movie})
}

async function readTheatersByMovie(req,res){
 res.json({ data: await service.readTheatersByMovie(res.locals.movie.movie_id)})
}

async function readReviewsByMovie(req,res){
  res.json({data: await service.readReviewsByMovie(res.locals.movie.movie_id)})
} 

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieIdExist), read],
  readTheatersByMovie: [asyncErrorBoundary(movieIdExist),asyncErrorBoundary(readTheatersByMovie)],
  readReviewsByMovie:[asyncErrorBoundary(movieIdExist), asyncErrorBoundary(readReviewsByMovie)]
}