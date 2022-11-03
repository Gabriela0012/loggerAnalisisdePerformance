import {Router} from 'express';
import Item from '../dao/MongoDAO/items.js'









const router = Router()
const itemService = new Item();

//items


router.get('/',async(req, res)=>{
  let itemsDB = await itemService.getAll();
  res.json(itemsDB);
})

//item
router.get('/item',async (req, res) => {
  const itemId = req.body.itemId

  try {
    const itemDB = await itemService.getItemById(itemId);
    console.log(itemDB);
    res.json(itemDB);

  } catch (error) {
    res.json({ error: error})
  }

})

router.post('/', async (req, res) => {
  console.log(req.body)
  const item = new Item({
    name: req.body.name,
    price: req.body.price,
    thumbnail: req.body.thumbnail
  })
  try {
    const newItem = await item.save();
    res.json(newItem);

    
  } catch (error) {
    res.json({message: error.message})
  }
})


export default router;
