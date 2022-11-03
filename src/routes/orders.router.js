import {Router} from 'express';
import Order from '../dao/MongoDAO/orders.js'









const router = Router()
const orderService = new Order();




router.post('/', async (req, res) => {
  console.log('BODY', req.body)
  const order = new Order({
    email: req.body.email,
    items: req.body.items
  })
  try {
    const newOrder = await order.save();
    res.json(newOrder);

    
  } catch (error) {
    res.json({message: error.message})
  }
})


export default router;