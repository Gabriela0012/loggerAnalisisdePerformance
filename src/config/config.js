export default{
  app: {
    MODE:process.env.NODE || 'PROD',
    PORT: process.env.PORT || '8080',
    DOMAIN: process.env.DOMAIN 
    
  
  },
  mongo:{
    USER: process.env.MONGO_USER,
    PWD: process.env.MONGO_PWD,
    DATABASE: process.env.MONGO_DB,

  }
  
}