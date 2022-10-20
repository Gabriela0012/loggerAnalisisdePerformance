import mongoose from 'mongoose';
import moment from 'moment'
import MongoDBContainer from './MongoDBContainer.js';
import UsersDao from './Users.js'


const collection = 'messages';
const usersService = new UsersDao();

const messageSchema = mongoose.Schema({
  email: String,
  author:[
    
    {
      type:mongoose.SchemaTypes.Mixed,
      ref:'Users'
    }
  ],
  message: String,
  timestamp:{
    type: String,
    default: ()=>moment().format('dddd, MMMM Do YYYY, h:mm:ss a'),
  }
})


export default class Message extends MongoDBContainer {
  constructor(){
    super(collection,messageSchema);
   
  }

  // creacion del carrito
  createMessages = async (document)=>{
    let results = await this.model.create(document);
    return results;
  }

  //buscarlo por Id
  getById = async(id) => {
    let result = await this.model.findById({_id:id});
    return result;
  }

  // Eliminar carrito de carritos
  deleteById = async(id) => {
    let conditions = {_id:id}
    await this.model.deleteOne(conditions)
  }

  addChat = async (message) => {
    const prevMessages = await this.getAll()
    console.log(message.email)
    const author = await usersService.getById(message.email)
    console.log(author)

    try {
   
        const newMessage = {
          author: author,
         
          email: message.email ? message.email : 'Pablito',
          message: message.message ? message.message : '(Empty message)',
        }    
        await this.save(newMessage)

    } catch (error) {
      console.log({Server: error})
    }
  }

 
            
  
}