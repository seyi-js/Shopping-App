const express = require('express');
const router = express.Router();
const bcrypt = require( "bcryptjs" );
const {redirectLogin, findById} = require('../../middleware/auth');


//Model
const User = require('../../Models/User');



//@route POST api/user/login
//@desc  Login Users
//@ccess  Public
router.post('/login', (req,res)=>{
    const {email, password} = req.body;
    if( !email || !password){
        res.status(400).json({msg: 'Please Enter All Fields'})
    } else [
        User.findOne({email})
        .then(user => {
            if(!user){
                res.status(400).json({msg: 'Invalid Credentials'})
            } else {

               bcrypt.compare(password, user.password)
               .then(isMatch => {
                   if(!isMatch){
                       res.status(400).json({msg: 'Invalid Credentials'})
                   }else{
                    req.session.userId = user._id;
                    const session = req.session;
                       res.json({
                           session,
                           user: {
                               id: user._id,
                               name: user.name,
                               email: user.email
                           }
                       })
                   }
               })
            }
        })
    ]
});


//@route POST api/user/register
//@desc  POST Register User
//@ccess  Public

router.post('/register', (req,res)=>{
    const {name, email, password} = req.body;
    if(!name || !email || ! password){
        res.status(400).json({msg: 'Please Enter All Fields'})
    } else [
        User.findOne({email})
        .then(user => {
            if(user){
                res.status(400).json({msg: 'User already Exist'})
            } else {
                const newUser = new User ({
                    name,
                    email,
                    password
                });

               bcrypt.genSalt(10, (err, salt) =>{
                   bcrypt.hash(newUser.password, salt, (err, hash)=>{
                       if(err){
                           throw err;
                       }else {
                           newUser.password = hash;
                           newUser.save()
                           .then(user =>{
                            req.session.userId = user._id;
                            const session = req.session;
                               res.json({
                                   session,
                                   user: {
                                       id: user._id,
                                       name: user.name,
                                       email: user.email
                                   }
                               })
                           })
                       }
                   })
               }) 
            }
        })
    ]
});

//@route GET api/user/user
//@desc  GET  UserData
//@ccess  Private

router.get( '/user', redirectLogin, findById, ( req, res ) => {
    
    res.json( userdata )
} );

// Users Logout route
router.get("/logout", redirectLogin, (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(401).json({msg : 'Nan'});
    } else {
      res.clearCookie(process.env.SESSION_NAME);
      res.json({msg: "Done"});
    }
  });
});

module.exports = router;