import { Router } from "express"
import session from "express-session"





const router = Router()


router.get('/visita', async(req,res)=>{
  if(req.session.counter){
    res.send(`visitado ${++req.session.counter} veces`)
  }else{
    req.session.counter = 1;
    res.send('bienvenido')
  }
})


export default router