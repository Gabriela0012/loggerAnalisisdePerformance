import {Router} from 'express'
import logger from '../middleware/logger.js'
import productDAO from '../dao/MongoDAO/Products.js'
import cartDAO from '../dao/MongoDAO/Carts.js'



const router = Router()
const productsService = new productDAO();
const cartsService = new cartDAO();

router.get('/', (req,res)=>{
    res.render('register')
})

router.get('/welcome', (req,res)=>{
    res.render('welcome')
})


router.get('/current', async (req,res)=>{
    if(!req.session.user) return res.redirect('/login');
    let products = await productsService.getAll()
    res.render('current', {products, user:req.session.user})

})
router.get('/cart', async (req,res)=>{
    if(!req.session.user) return res.redirect('/login');
    let cart = await cartsService.getAll()
    res.render('current', {cart, user:req.session.user})
})


router.get('/login', (req,res)=>{
    res.render('login')
})
router.get('/loginfail', (req,res)=>{
    logger.error(`Error login ${req.method} ${req.url}`)
    logger.warn(`warning login ${req.method} ${req.url}`)
    res.render('loginfail')
})
router.get('/registerfail', (req,res)=>{
    logger.error( `User error registering ${req.method} ${req.url}`)
    res.render('registerfail')
})

router.get('/welcome',(req,res)=>{
    if(!req.session.user) return res.redirect('/login');
    res.render('welcome',{user:req.session.user})

})
router.get('/logout', (req,res)=>{
    if(req.session.user){
        req.session.cookie.maxAge = 0
    
        
        delete req.session.user
    }

    res.redirect('/')
      

})

router.get('/pedido', (req,res)=>{
    res.render('order')
})




export default router