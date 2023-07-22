import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js';
const checkAuth = async (req,res,next) => {
    let token;
    // En POSTMAN, podemos agregar un tipo de autenticacion y agregar el token ahi mismo
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        try {
            // Guardamos en una variable el JWT
            token = req.headers.authorization.split(' ')[1];
            // Obtenemos el valor real del token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            // A nuestro request lo creamos una variable que solo existira durante esa solicitud.
            req.usuario = await Usuario.findById(decoded.id).select('_id nombre email')
            next()
        } catch (error) {
            return res.status(404).json({msj:'Hubo un error'})
        }
    }

    if(!token){
        const error = new Error('Token no valido')
        return res.status(401).json({msj:error.message})
    }
}

export default checkAuth