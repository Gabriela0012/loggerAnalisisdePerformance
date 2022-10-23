import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import viewsRouter from './routes/views.router.js'
import productContainerKnex from './container/productContainerKnex.js'
import chatContainerKnex from './dao/MongoDAO/Messages.js'
import productTestRouter from './routes/productTest.router.js'
import messageRouter from './routes/message.router.js'
import messageNormalizerRouter from './routes/messagesNormalize.router.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import sessionsRouter from './routes/session.router.js'
import currentRouter from './routes/current.router.js'
import initializePassport from './config/passport.config.js'
import passport from 'passport'
import config from './config/config.js'

const app = express()
const PORT = config.app.PORT
const productService = new productContainerKnex();
const chatService = new chatContainerKnex();




initializePassport();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const server = app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`)
})


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use(express.static(__dirname + '/public'))
app.use(session({
  store:MongoStore.create({
    mongoUrl:`mongodb+srv://${MONGO_USER}:135632@ecommerce1.dxk6fgr.mongodb.net/BaseSessions?retryWrites=true&w=majority`,
    ttl:3600
  }),
  secret:'desafio login por formulario',
  resave:false,
  saveUninitialized:false,
  cookie: {
    maxAge: 30000
  }
}))
console.log(config.mongo.MONGO_URL)
app.use(passport.initialize());
app.use(passport.session());


app.use('/', viewsRouter)
app.use('/api/products-test',productTestRouter);
app.use('/api/messages',messageRouter);
app.use('/api/message',messageNormalizerRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/current',currentRouter);



const io = new Server(server)
let products
let log

io.on('connection', async (socket) => {

  products = await productService.getAllProduct()

  log = await chatService.getAll()



  console.log('Socket connected')
  socket.broadcast.emit('newUserConnected')
  io.emit('log', log)
  socket.emit('productList', { products })

  socket.on('message', async(data) => {
    let currentTime = new Date();
    data.date = currentTime.toLocaleTimeString();
    await chatService.addChat(data)

    log = await chatService.getAll()
    io.emit('log', log)
  })
    
  socket.on('addProduct', async (data) => {
    await productService.addNewProduct(data)
    products = await productService.getAllProduct()
    io.emit('productList', { products })
  })

    
})
