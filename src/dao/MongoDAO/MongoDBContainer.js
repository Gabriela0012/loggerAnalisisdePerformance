import mongoose from 'mongoose';
import config from '../../config/config.js'


export default class MongoContainer{
  constructor(collection,schema){
    mongoose.connect(config.mongo.MONGO_URL, err =>{
    if(err) console.log(err);
    else console.log('Base conectada a Atlas');
    })
    this.model = mongoose.model(collection,schema);
  }

  getAll = async ()=>{
    let results = await this.model.find().lean();
    return results;
  }
  save = async (document)=>{
    let results = await this.model.create(document);
  return results;
  }
  update = async (object) => {
    let id = object.id
    delete object.id
    await this.model.updateOne({_id:id}, {$set:object})
  }

  deleteAll = async ()=>{
    await this.modelService.deleteAll()
  }
  
}
