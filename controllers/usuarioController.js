import Usuario from '../models/Usuario.js'
import generarId from '../helpers/generarId.js';
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
    const existeUsuario = await Usuario.findOne({email}) 
    if(!existeUsuario){
        const error = new Error('El Usuario no existe')
        return res.status(404).json({msj:error.message})
    }
    
    // Comprobar si el usuario esta confirmado
    if(!existeUsuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada')
        return res.status(404).json({msj:error.message})
    }

    // Comprobar su password

    res.json({msj:'autenticando...'})
}

export {
    registrar,
    autenticar
}