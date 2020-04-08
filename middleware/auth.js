const User = require('../Models/User');

// Redirect Login For protecting routes
  function redirectLogin(req, res, next){
    if (!req.session.userId) {
      res.status(401).json({msg: 'Authorization Denied'});
    } else {
      next();
    }
  };
  
  // Redirect Home For already logged in persons
   const redirectHome = (req, res, next) => {
    if (req.session.userId) {
      res.redirect("/");
    } else {
      next();
    }
  };
  
  //fOR FINDING USERS BY ID
  const findById = (req, res, next) => {
    // var userId = req.query.userId ;
    
    var { userId } = req.session;
    User.findById(userId)
      .select("-password")
      .then(user => {
        userdata = user;
        next();
      });
  };

module.exports = {redirectLogin, findById, redirectHome};



  
  