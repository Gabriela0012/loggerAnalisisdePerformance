import {Router} from 'express';
import getOrderAmount from '../data/getOrderAmount.js';

//envio demensaje
import nodemailer from 'nodemailer'

const router = Router();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
      user: 'gabega10@gmail.com',
      pass: 'dmchluxovcttdzpa'
  }
});


// dmchluxovcttdzpa


router.get('/', async (req, res)=> {
  const items = req.body
  const totalPay = await getOrderAmount(items)
  try {
    let result = await transporter.sendMail({
      from: 'yo',
      to: `${order.email}`,
      subject:"holaaaaaaa",
      html: `
        <div>
          
          <h1>${totalPay}</h1>
        </div>
      `
    })
    res.send(result)
  } catch (error) {
    res.send(error.message)
  }

})











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
