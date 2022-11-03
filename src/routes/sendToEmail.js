import {Router} from 'express';
import getOrderAmount from '../data/getOrderAmount.js';








const router = Router()

//items


router.post('/', async (req, res) => {
 const items = req.body
  
  try {
    const totalPay = await getOrderAmount(items)
    console.log(totalPay)
    res.json(totalPay)

    
  } catch (error) {
    res.json({message: error.message})
  }
})


export default router;