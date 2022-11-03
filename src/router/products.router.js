import { Router } from "express";
import services from '../dao/index.js';


const router = Router();
const admin = true;

async function validateID(req,res,next){
  console.log(req.params.pid)
  try {
      req.params.pid =(req.params.pid)
  } catch (error) {
      console.log(error)
      return res.status(400).send({status:'error', error:'Invalid id'})
  }
  req.params.product = await services.productsService.getById(req.params.pid)
  console.log(req.params.product)
  if(req.params.product == null) return res.status(404).send({status:'error', error:'Product not found'})
  next()
}


router.get('/',async(req, res)=>{
  let products = await services.productsService.getAll();
  res.send(products);
  console.log(products);
})
// // para ver los productos por id en la url agregue "api/products/'y el numero que desee'
router.get('/:pid',validateID, async(req, res)=>{
  try {

    let product = await services.productsService.getById(req.params.pid)
    if(product === null) return res.status(404).send({status:'error', error:'Product not found'})
    res.send({product})
    
} catch (error) {
    console.log('Router get products '+error)
    return res.status(400).send({status:'error', error:'Bad request'})
}
})

router.post('/',async(req, res)=>{
  if(admin===false){
    return res.status(404).send({status:'error', description: 'ruta/api/products/ no autorizada'})

  }
  else{
    let product = req.body
  console.log(product)
  let newArray = await services.productsService.save(product);
  res.json(newArray);

  }
 
})

router.put('/:pid',validateID, async (req,res)=>{
  let body = req.body;
  if(admin===false){
    return res.status(404).send({status:'error', description: 'ruta/api/products/ no autorizada'})

  }else{
  await services.productsService.update(req.params.pid, body)
  res.send(`producto con id: ${req.params.pid} actualizado`)}
})

router.delete('/:pid',validateID, async (req,res)=>{
  if(admin===false){
    return res.status(404).send({status:'error', description: 'ruta/api/products/ no autorizada'})

  }
  else{
  await services.productsService.deleteById(req.params.pid)
  res.send(`Producto con id: ${req.params.pid} eliminado de productos`)}
})




export default router;