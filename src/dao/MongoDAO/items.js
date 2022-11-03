import mongoose from 'mongoose';
import moment from 'moment'
import MongoDBContainer from './MongoDBContainer.js';

const collection = 'items';


const itemSchema = mongoose.Schema({
  name:{
    type: 'string',
    required:true
  },
  price:Number,
  thumbnail:String,
  timestamp:{
    type: String,
    default: ()=>moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
  }
})

export default class Items extends MongoDBContainer {
  constructor(){
    super(collection,itemSchema);
    this.pepe = 0
  }

  // creacion del carrito
  saveItem = async (document)=>{
    let results = await this.model.create(document);
    return results;
  }




  getItemById = async(id)=> {
    const itemDB = await this.model.findById(id)
    return itemDB;
  }

 
            
  
}




