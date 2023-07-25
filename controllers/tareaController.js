import Tarea from "../models/Tarea.js"
import Proyecto from "../models/Proyecto.js"
import mongoose from "mongoose"

const nuevaTarea = async (req,res) => {
    const {proyecto} = req.body

    const valid = mongoose.Types.ObjectId.isValid(proyecto)

    if(!valid){
        const error = new Error('ID INVALIDO PARA MONGO')
        return res.status(404).json({msj: error.message})
    }

    const existeProyecto = await Proyecto.findById(proyecto)
    if(!existeProyecto){
        const error = new Error('EL PROYECTO NO EXISTE')
        return res.status(404).json({msj: error.message})
    }
    
    if(req.usuario._id.toString() !== existeProyecto.creador.toString()){
        const error = new Error('ACCION NO VALIDA')
        return res.status(401).json({msj: error.message})
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body)
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }
}

const obtenerTarea = async (req,res) => {

}

const editarTarea = async (req,res) => {

}

const eliminarTarea = async (req,res) => {

}

const cambiarEstado = async (req,res) => {

}

export {
    nuevaTarea,
    obtenerTarea,
    editarTarea,
    eliminarTarea,
    cambiarEstado
}