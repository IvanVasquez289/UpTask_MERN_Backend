import Tarea from "../models/Tarea.js"
import mongoose from "mongoose"
const checkCreadorTarea = async (req,res,next) => {
   
    const {id} = req.params
    const valid = mongoose.Types.ObjectId.isValid(id)

    if(!valid){
        const error = new Error('ID INVALIDO PARA MONGO')
        return res.status(404).json({msj: error.message})
    }

    const tarea = await Tarea.findById(id).populate('proyecto')

    if(!tarea){
        const error = new Error('LA TAREA NO EXISTE')
        return res.status(404).json({msj: error.message})
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('ACCION NO VALIDA')
        return res.status(403).json({msj: error.message})
    }

    next()
}

export default checkCreadorTarea