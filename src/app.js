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
    mongoUrl:'mongodb+srv://gabriela:135632@ecommerce1.dxk6fgr.mongodb.net/BaseSessions?retryWrites=true&w=majority'
  }),
  secret:'desafio login por formulario',
  resave:false,
  saveUninitialized:false,
  cookie: {
    maxAge: 30000
  }
}))

app.use(passport.initialize());
app.use(passport.session());


app.use('/', viewsRouter)
app.use('/api/products-test',productTestRouter);
app.use('/api/messages',messageRouter);
app.use('/api/message',messageNormalizerRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/current',currentRouter);

