const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");




async function reviewIdExists(req,res,next){
  const {reviewId} = req.params;
  const review = await service.read(reviewId);//reviewId is the string in the params 
  if(review){
    res.locals.review = review;
    return next();
  }
  next({ status:404, message: "Review cannot be found"})
}


const destroy = async (req, res, next) => {
  await service.delete(res.locals.review.review_id);
  res.sendStatus(204);
};

async function update(req, res) {
  const reviewId = res.locals.review.review_id
const updatedReview = {
  ...req.body.data,
  review_id: reviewId ,
};

  await service.update(updatedReview);
  res.json({ data: await service.read(reviewId) });
}


module.exports = {
  delete: [asyncErrorBoundary(reviewIdExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewIdExists),asyncErrorBoundary(update)]
}