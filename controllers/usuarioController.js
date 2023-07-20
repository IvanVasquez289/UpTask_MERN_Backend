import Usuario from '../models/Usuario.js'
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';
const registrar = async (req,res) => {

    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({email:email})
    if(existeUsuario){
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({msj:error.message})
    }
    
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId()
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)
    } catch (error) {
        console.log(error)
    }
    console.log(req.body)
    
}

const autenticar = async (req,res) => {
    const {email,password} = req.body

    // Comprobar si el usuario exisre
    const usuario = await Usuario.findOne({email}) 
    if(!usuario){
        const error = new Error('El Usuario no existe')
        return res.status(404).json({msj:error.message})
    }
    
    // Comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada')
        return res.status(403).json({msj:error.message})
    }
    // usuario.saludar()

    // Comprobar su password
    if(await usuario.comprobarPassword(password)){
        return res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id),
        })
    }else{
        const error = new Error('El Password es Incorrecto')
        return res.status(403).json({msj:error.message})
    }
    res.json({msj:'autenticando...'})
}

export {
    registrar,
    autenticar
}