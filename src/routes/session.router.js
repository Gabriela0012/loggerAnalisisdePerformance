import { Router } from "express";
import usersDao from '../dao/MongoDAO/Users.js';
import passport from 'passport';
import logger from '../middleware/logger1.js'




const router = Router()
const userService = new usersDao()



router.post('/register',passport.authenticate('register',{
  successRedirect:'/login',
  failureRedirect: '/registerfail'})
  , async(req,res)=>{
  logger.info('User registration')

 
  res.send({status: 'success', payload:req.user._id})

})


router.post('/login',passport.authenticate('login',{
  failureRedirect: '/loginfail'})
  , async(req,res)=>{
  
  req.session.user = {
    name: req.user.name,
    email: req.user.email,
    id: req.user._id,
    role:'user'
  }
  logger.info('usuario logeado')
  res.redirect('/welcome')
  
  
})

router.get('/logout', (req, res) => {
  console.log('hola')
  if(req.session.user){
    req.session.cookie.maxAge = 0
    delete req.session.user
  }
  
  res.redirect('/')
  

});

export default router