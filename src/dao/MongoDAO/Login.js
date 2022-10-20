import mongoose from 'mongoose';
import moment from 'moment'
import MongoDBContainer from './MongoDBContainer.js';


const collection = 'login';


const loginSchema = mongoose.Schema({
  email : {
    type: 'string',
    required:true,
    unique:true,
    index: { unique:true }
  },

  password: {
    type: String,
    required:true

  }
})


export default class Logins extends MongoDBContainer {
  constructor(){
    super(collection,loginSchema);
 
  }

  // creacion del carrito
  createUser = async (document)=>{
    let results = await this.model.create(document);
    return results;
  }


 
   
  
}