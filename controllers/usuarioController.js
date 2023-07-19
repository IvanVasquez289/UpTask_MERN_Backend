import Usuario from '../models/Usuario.js'
const registrar = async (req,res) => {

    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({email:email})
    if(existeUsuario){
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({msj:error.message})
    }
    
    try {
        const usuario = new Usuario(req.body)
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)
    } catch (error) {
        console.log(error)
    }
    console.log(req.body)
    
}

export {
    registrar
}