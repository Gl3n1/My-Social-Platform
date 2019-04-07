const express = require('express');
const router = express.Router(); 
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys');
const passport = require('passport')

//load user model
const User = require('../../models/User');

// @route   api/users/test
// @desc    test users route
// @access  public 
router.get('/test',(req,res)=>res.json({msg: 'users works '}))

// @route   api/users/register
// @desc    Register users
// @access  public 
router.post('/register',(req,res)=>{
    User.findOne({email: req.body.email}).then(user=>{
        if(user) {
            return res.status(400).json({email: 'email already exists!'})
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', //size
                r: 'pg', //ratings
                g: 'mm'
            })

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
            })

            bcrypt.genSalt(10, (err,salt)=>{
                bcrypt.hash(newUser.password, salt, (err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err=>console.log(err))
                })
            })
        }
    })
})

// @route   api/users/login
// @desc    login users / return token
// @access  public
router.post('/login', (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    // find user by email
    User.findOne({email})
        .then(user=>{
            // check for user
            if(!user) {
                res.status(404).json({email:'user not found'})
            }

            //check for password
            bcrypt.compare(password, user.password)
                .then(isMatch=>{
                    if(isMatch) {
                        // user matched 
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                        }
                        //sign token
                        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600},(err,token)=>{
                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                            })
                        }) 
                    } else {
                        res.status(400).json({password: 'password incorrect'})
                    }
                })
        })
})

// @route   api/users/current
// @desc    return current user
// @access  private 
  router.get('/current', passport.authenticate('jwt',{session:false}), (req,res)=> {
      res.json({
          id: req.user.id,
          name: req.user.name,
          email: req.user.email
      }) 
  })


module.exports = router; 