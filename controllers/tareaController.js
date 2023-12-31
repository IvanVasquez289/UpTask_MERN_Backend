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
        return res.status(403).json({msj: error.message})
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body)
        // Almacenar Id de la tarea en el proyecto
        existeProyecto.tareas.push(tareaAlmacenada._id)
        await existeProyecto.save()
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }
}

const obtenerTarea = async (req,res) => {
    const {id} = req.params
    const tarea = await Tarea.findById(id).populate('proyecto')
    res.json(tarea)
}

const editarTarea = async (req,res) => {
    const {id} = req.params
    const tarea = await Tarea.findById(id).populate('proyecto')

    const propsToUpdate = Object.keys(req.body)
    try {
        propsToUpdate.forEach(prop => {
            if( prop in tarea){
                tarea[prop] = req.body[prop]
            }
        })
        await tarea.save()
    } catch (error) {
        console.log(error)
    }

    res.json(tarea)
}

const eliminarTarea = async (req,res) => {
    const {id} = req.params
    const tarea = await Tarea.findById(id).populate('proyecto')

    try {
        const proyecto = await Proyecto.findById(tarea.proyecto)
        proyecto.tareas.pull(tarea._id)

        await Promise.allSettled([ await proyecto.save(), await tarea.deleteOne()])

        res.json({msj: 'Eliminado Exitosamente'})
    } catch (error) {
        console.log(error)
    }
}

const cambiarEstado = async (req,res) => {
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
    
    // La persona que quiere marcar la tarea debe ser el creador o colaborador
    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString() && !tarea.proyecto.colaboradores.some(item => item._id.toString() === req.usuario._id.toString())){
        const error = new Error('ACCION NO VALIDA')
        return res.status(403).json({msj: error.message})
    }

    tarea.estado = !tarea.estado
    tarea.completado = req.usuario._id
    await tarea.save()

    const tareaAlmacenada = await Tarea.findById(id).populate('proyecto').populate('completado','nombre')

    res.json(tareaAlmacenada)
}

export {
    nuevaTarea,
    obtenerTarea,
    editarTarea,
    eliminarTarea,
    cambiarEstado
}