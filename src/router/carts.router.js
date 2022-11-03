import { Router } from "express";
import services from '../dao/index.js';

const router = Router();

async function validatePID(req,res,next){
    req.params.product = await services.productsService.getById(req.params.pid)
    if(!req.params.product) return res.status(404).send({status:'error', error:'Product not found'})
    next()
}


async function validateID(req,res,next){
    try {
        req.params.cart = await services.cartsService.getById(req.params.cid)
    } catch (error) {
        return res.status(300).send({status:'error', error:'Invalid id'})
    }
    if(!req.params.cart) return res.status(404).send({status:'error', error:'Cart not found'})
    next()
}

//crear un carrito y devuelve su id,el carrito tiene que estar vacio
router.post('/',async(req, res)=>{
  let cart = req.body
  console.log(cart)
  let newArray = await services.cartsService.saveCart(cart);
  res.send({status:'success', message: 'Cart successfully'});
})

// //elimina el carrito
router.delete('/:cid',validateID, async (req,res)=>{
  await services.cartsService.deleteById(req.params.cid)
  res.send(`Cart with id: ${req.params.cid} removed from carts`)
})


//mostrar todos los carritos
router.get('/',async(req, res)=>{
  let cartProducts = await services.cartsService.getAll();
  res.json(cartProducts);
})

//mostrar un carrito en especifico
router.get('/:cid',validateID, async(req, res)=>{
  try {
    let cart = await services.cartsService.getById(req.params.cid)
    if(cart === null) return res.status(404).send({status:'error', error:'Product not found'})
    res.send({cart})
    console.log(req.params.cid)
    
} catch (error) {
    console.log('Router get products '+error)
    return res.status(400).send({status:'error', error:'Bad request'})
}
})


// agregar productos por Id
router.post('/:cid/products', validateID, async (req,res)=>{
    const {id, quantity} = req.body
    if(!id||!quantity){
        return res.status(300).send({status:'error', error:"blank spaces are NOT allowed"})
    }else{
        try {
            await services.cartsService.updateCart(req.params.cid, id, parseInt(quantity))
            res.send({status:'success',message:'successfully saved into the cart'})
        } catch (error) {
            return res.status(500).send({status:'error', error:"it couldn't upload the product into the cart"})
        }
    }
})

// // elimina el producto del carrito 

router.delete('/:cid/products/:pid', async (req,res)=>{
    let cart = await services.cartsService.getById(req.params.cid)
    let product = await services.productsService.getById(req.params.pid)
    if(cart==null){
        return res.status(404).send({status:'error', error:"cart doesn't exist"})
    }else if(product == null){
        return res.status(404).send({status:'error', error:"product doesn't exist"})
    }else{
        try {
            await services.cartsService.deleteProductCart(req.params.cid,req.params.pid)
            res.send({status:'success',message:'successfully deleted from cart'})
        } catch (error) {
            return res.status(500).send({status:'error', error:"it couldn't delete the product from the cart"})
        }
    }
  })


export default router;