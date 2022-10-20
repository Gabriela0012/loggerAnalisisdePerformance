import { Router } from "express"
import usersDao from '../dao/MongoDAO/Users.js'

import session from "express-session"




const router = Router()
const userService = new usersDao()





router.get('/', async(req,res)=>{

    if(req.session.user){
			console.log(req.session.user)
			const {email} = req.session.user
			console.log(email)
      res.send(`<div class=" col-5">
			<h2>bienvenido ${email}</h2>
	 
			<a href='http://localhost:8080/api/logout'>Cerrar sesion</a>
				
		
					
		</div>`)
			console.log(req.session.user)
    }else{
      
      res.send('porfavor accede primero')
    }
})

// router.post('/', async (req, res) => {
//   const { email, password } = req.body
// 	console.log(req.body)
// 	try{
// 		if (!email || !password) {
// 			res.status(400).json({ msg: 'Something missing' })
// 		}
	
// 		const exists = await userService.getById(req.body.email)
	
// 		if (exists) {
// 		// ------- NEW CODE HERE
// 			const userSession = await userService.getById(req.body.email)// creating user session to keep user loggedin also on refresh
// 			req.session.user = userSession 
// 			// attach user session to session object from express-session
// 			console.log(req.session.user)
// 			return res
// 				.status(200)
// 				.json({ msg: 'You have logged in successfully', userSession }) // attach user session id to the response. It will be transfer in the cookies
// 		} else {
// 			return res.status(400).json({ msg: 'Invalid credential' })
// 		}

// 	}catch(error){
// 		return res.json({error: 'no se pudo guardar usuario'})

// 	}

  
// })

export default router