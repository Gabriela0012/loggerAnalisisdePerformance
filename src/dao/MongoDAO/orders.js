import mongoose from 'mongoose';
import moment from 'moment'
import Item from './items.js'
import MongoDBContainer from './MongoDBContainer.js';


const collection = 'orders';


const itemService = new Item();

const orderSchema = mongoose.Schema({
  email:{
    type: 'string',
    required:true
  },
  items: [
    {
      _id: false,
      id: String,
      qty: Number,
    }
  ],
  timestamp:{
    type: String,
    default: ()=>moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
  }
})

export default class Order extends MongoDBContainer {
  constructor(){
    super(collection,orderSchema);
    this.pepe = 0
  }

  // creacion del carrito
  saveItem = async (document)=>{
    let results = await this.model.create(document);
    return results;
  }

  getOrderAmount = async(items) =>{
    let amount = 0;
  
    for(let index = 0; index < items.length; index++){
      const item = items[index];
      const itemDB = await itemService.getItemById(item.id)
  
  
      let operation = itemDB.price * item.qty;
      amount += operation;
    }
    // const onlyTwoDecimals = amount.toFixed(2);
    // const parsedAmount = parseInt(onlyTwoDecimals.replace('.', ''), 10);
    // return parsedAmount;
    return amount;
  }

 
      
}



