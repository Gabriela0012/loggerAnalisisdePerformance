import { Router } from "express";
import cartsDAO from '../dao/MongoDAO/carts.js'
import productsDAO from '../dao/MongoDAO/Products.js'

const router = Router();
const cartsService = new cartsDAO();
const productsService = new productsDAO();

async function validatePID(req,res,next){
    req.params.product = await productsService.getById(req.params.pid)
    if(!req.params.product) return res.status(404).send({status:'error', error:'Product not found'})
    next()
}


async function validateID(req,res,next){
    try {
        req.params.cart = await cartsService.getById(req.params.cid)
    } catch (error) {
        return res.status(300).send({status:'error', error:'Invalid id'})
    }
    if(!req.params.cart) return res.status(404).send({status:'error', error:'Cart not found'})
    next()
}


router.post('/:cid/products/:pid', async (req,res)=>{
    let quantity = req.body.quantity
    console.log(quantity)
    let cart = await cartsService.getById(req.params.cid)
    let product = await productsService.getById(req.params.pid)
    if(cart==null){
        return res.status(404).send({status:'error', error:"cart doesn't exist"})
    }else if(product == null){
        return res.status(404).send({status:'error', error:"product doesn't exist"})
    }else{
        try {
            await cartsService.updateCart(req.params.cid,req.params.pid, quantity)
            res.send({status:'success',message:'successfully from cart'})
        } catch (error) {
            return res.status(500).send({status:'error', error:"it couldn't delete the product from the cart"})
        }
    }

    
})


// router.post('/products', async (req,res)=>{
//     const {id, quantity} = req.body
//     console.log(id, quantity)
//     if(!id||!quantity){
//         return res.status(300).send({status:'error', error:"blank spaces are NOT allowed"})
//     }else{
//         try {
//             await cartsService.updateCart( id, parseInt(quantity))
//             res.send({status:'success',message:'successfully saved into the cart'})
//         } catch (error) {
//             return res.status(500).send({status:'error', error:"it couldn't upload the product into the cart"})
//         }
//     }
// })
































// //crear un carrito y devuelve su id,el carrito tiene que estar vacio
// router.post('/',async(req, res)=>{
//   let cart = req.body
//   console.log(cart)
//   let newArray = await cartsService.saveCart(cart);
//   res.send({status:'success', message: 'Cart successfully'});
// })

// // //elimina el carrito
// router.delete('/:cid',validateID, async (req,res)=>{
//   await cartsService.deleteById(req.params.cid)
//   res.send(`Cart with id: ${req.params.cid} removed from carts`)
// })


// //mostrar todos los carritos
router.get('/',async(req, res)=>{
  let cartProducts = await cartsService.getAll();
  res.json(cartProducts);
})

// //mostrar un carrito en especifico
router.get('/:cid',validateID, async(req, res)=>{
  try {
    let cart = await cartsService.getById(req.params.cid)
    if(cart === null) return res.status(404).send({status:'error', error:'Product not found'})
    res.send({cart})
    console.log(req.params.cid)
    
} catch (error) {
    console.log('Router get products '+error)
    return res.status(400).send({status:'error', error:'Bad request'})
}
})


// // agregar productos por Id
// router.post('/:id', validateID, async (req,res)=>{
//     const {id, quantity} = req.params
//     console.log(id)
//     if(!id||!quantity){
//         return res.status(300).send({status:'error', error:"blank spaces are NOT allowed"})
//     }else{
//         try {
//             await cartsService.updateCart( id, parseInt(quantity))
//             res.send({status:'success',message:'successfully saved into the cart'})
//         } catch (error) {
//             return res.status(500).send({status:'error', error:"it couldn't upload the product into the cart"})
//         }
//     }
// })

// // // elimina el producto del carrito 

// router.delete('/:cid/products/:pid', async (req,res)=>{
//     let cart = await cartsService.getById(req.params.cid)
//     let product = await productsService.getById(req.params.pid)
//     if(cart==null){
//         return res.status(404).send({status:'error', error:"cart doesn't exist"})
//     }else if(product == null){
//         return res.status(404).send({status:'error', error:"product doesn't exist"})
//     }else{
//         try {
//             await cartsService.deleteProductCart(req.params.cid,req.params.pid)
//             res.send({status:'success',message:'successfully deleted from cart'})
//         } catch (error) {
//             return res.status(500).send({status:'error', error:"it couldn't delete the product from the cart"})
//         }
//     }
//   })


export default router;