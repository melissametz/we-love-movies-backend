
function methodNotAllowed(req,res,next){
  next({
    status: 405,
    message: `${req.method} not allowed for ${req.path}`
  })
}

module.exports = methodNotAllowed;