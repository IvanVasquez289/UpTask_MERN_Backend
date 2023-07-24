import Proyecto from "../models/Proyecto.js"
import mongoose from "mongoose"
const checkCreador = async (req,res,next) => {
    const {id} = req.params
    const valid = mongoose.Types.ObjectId.isValid(id)

    if(!valid){
        const error = new Error('ID INVALIDO PARA MONGO')
        return res.status(404).json({msj: error.message})
    }

    const proyecto = await Proyecto.findById(id)
    if(!proyecto){
        const error = new Error('EL PROYECTO NO EXISTE')
        return res.status(404).json({msj: error.message})
    }

    if(req.usuario._id.toString() !== proyecto.creador.toString()){
        const error = new Error('EL PROYECTO NO TE PERTENECE')
        return res.status(401).json({msj: error.message})
    }
    next() 
}

export default checkCreador 