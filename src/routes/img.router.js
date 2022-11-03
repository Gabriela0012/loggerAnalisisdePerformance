import {Router} from 'express';
import __dirname from '../utils.js';








const router = Router()

//items
router.get('/:imgName', (req, res) => {
  const image = req.params.imgName;
  console.log(image);
  res.sendFile(`${__dirname}/img/${image}`)


})




export default router;