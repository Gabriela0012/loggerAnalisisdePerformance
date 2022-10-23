export default{
  app: {
    MODE:process.env.NODE || 'PROD',
    PORT: process.env.PORT || '8080',
    DOMAIN: process.env.DOMAIN 
    
  
  },
  mongo:{
    MONGO_URL:process.env.MONGO_URL

  }
  
}