import Usuario from '../models/Usuario.js'
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';
import { emailRegistro , emailOlvidePassword} from '../helpers/email.js';
const registrar = async (req,res) => {

    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({email:email})
    if(existeUsuario){
        const error = new Error('Este usuario ya esta en uso. Elige otro.')
        return res.status(400).json({msj:error.message})
    }
    
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId()
        await usuario.save()
        emailRegistro({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token
        })
        res.json({msj: 'Usuario creado exitosamente, Revisa tu Email para confirmar tu cuenta'})
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

const confirmar = async (req,res) => {
    const {token} = req.params
    const usuarioConfirmar = await Usuario.findOne({token})

    if(!usuarioConfirmar){
        const error = new Error('Token no Valido')
        return res.status(403).json({msj:error.message})
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = '';
        await usuarioConfirmar.save()
        res.json({msj: 'Usuario confirmado correctamente'})
    } catch (error) {
        console.log(error)
    }
}

const olviderPassword = async (req,res) => {
    const {email} = req.body;
    const usuario = await Usuario.findOne({email}) 
    if(!usuario){
        const error = new Error('El Usuario no existe')
        return res.status(404).json({msj:error.message})
    }

    // Comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error('No puedes cambiar el password sin haber confirmado primero tu cuenta')
        return res.status(403).json({msj:error.message})
    }

    try {
        usuario.token = generarId()
        await usuario.save()
        res.json({msj: 'Hemos enviado un email con las instrucciones'})
        emailOlvidePassword({
            nombre: usuario.nombre,
            email: usuario.email,
            token: usuario.token
        })
    } catch (error) {
       console.log(error) 
    }
}

const comprobarToken = async (req,res) => {
    const {token} = req.params
    const tokenValido = await Usuario.findOne({token})

    if(tokenValido){
        res.json({msj:'Mostrando formulario para definir nuevo password'})
    }else{
        const error = new Error('Token no Valido')
        return res.status(403).json({msj:error.message})
    }
}

const nuevoPassword = async (req,res) => {
    const {token} = req.params;
    const {password} = req.body;

    const usuario = await Usuario.findOne({token})
    if(usuario){
        usuario.password = password;
        usuario.token = '';
        try {
            await usuario.save()
            res.json({msj:'La contraseña se ha cambiado'})  
        } catch (error) {
            console.log(error)
        }        
    }else{
        const error = new Error('Token no Valido')
        return res.status(403).json({msj:error.message})
    }
}

const perfil = async (req,res) => {
    const {usuario} = req;
    res.json(usuario)
}
export {
    registrar,
    autenticar,
    confirmar,
    olviderPassword,
    comprobarToken,
    nuevoPassword,
    perfil
}