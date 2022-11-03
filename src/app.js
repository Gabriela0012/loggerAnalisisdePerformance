import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import viewsRouter from './routes/views.router.js'
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import sessionsRouter from './routes/session.router.js'
import currentRouter from './routes/current.router.js'
import initializePassport from './config/passport.config.js'
import passport from 'passport'
import config from './config/config.js'

const app = express()
const PORT = config.app.PORT





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
    mongoUrl:config.mongo.MONGO_URL,
    ttl:3600
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


app.use('/api/sessions',sessionsRouter);
app.use('/api/current',currentRouter);
app.use('/api/products',productRouter);
app.use('/api/carts',cartRouter)
