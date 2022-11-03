import Item from '../dao/MongoDAO/items.js'


export default async function getItemById(id){
  const itemDB = await Item.findById(id);
  return itemDB;
}