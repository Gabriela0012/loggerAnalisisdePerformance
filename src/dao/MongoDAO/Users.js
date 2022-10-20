import mongoose from 'mongoose';
import moment from 'moment'
import MongoDBContainer from './MongoDBContainer.js';


const collection = 'users';


const userSchema = mongoose.Schema({
  email : {
    type: 'string',
    required:true,
    unique:true,
    index: { unique:true }
  },
  name:{
    type: 'string',
    required:true
  },
  last_name:String,
  age:Number,
  nickname:String,
  avatar_url:String,
  timestamp:{
    type: String,
    default: ()=>moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
  },
  messages: [
    {
      type:mongoose.SchemaTypes.ObjectId,
      ref: 'Messages',
    }
  ],
  password: {
    type: String,
    required:true

  }
})


export default class Users extends MongoDBContainer {
  constructor(){
    super(collection,userSchema);
 
  }

  // creacion del carrito
  createUser = async (document)=>{
    let results = await this.model.create(document);
    return results;
  }

  //buscarlo por Id
  getByEmail = async(email) => {
    let result = await this.model.findOne({email:email});
    return result;
  }
  getByPassword = async(password) => {
    let result = await this.model.findOne({password:password});
    return result;
  }

  // Eliminar carrito de carritos
  deleteById = async(id) => {
    let conditions = {_id:id}
    await this.model.deleteOne(conditions)
  }
  getById = async(id) => {
    let result = await this.model.findOne({_id:id});
    return result;
  }
 
   
  
}