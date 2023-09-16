import mongoose from 'mongoose'
import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tarea.js'
import Usuario from '../models/Usuario.js'
const  obtenerProyectos = async (req,res) => {  
    const proyectos = await Proyecto.find()
        .where('creador')
        .equals(req.usuario._id)
        .select('-tareas')
    res.json(proyectos)
}

const nuevoProyecto = async (req,res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id
    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const  obtenerProyecto = async (req,res) => {
    const {id} = req.params
    const proyecto = await Proyecto.findById(id).populate('tareas')

    // const tareas = await Tarea.find().where('proyecto').equals(proyecto._id)
    res.json(proyecto)
    
}

const  editarProyecto = async (req,res) => {
    const {id} = req.params
    const proyecto = await Proyecto.findById(id)

    // proyecto.nombre = req.body.nombre || proyecto.nombre
    const propsToUpdate = Object.keys(req.body)
  
    if(Object.values(req.body).includes('')){
        return res.json({msj: "TODOS LOS CAMPOS SON OBLIGATORIOS"})
    }

    try {
        propsToUpdate.forEach(prop =>{
            if(prop in proyecto){
                proyecto[prop] = req.body[prop]
            }
        })   
        await proyecto.save()
    } catch (error) {
        console.log(error)
    }

    res.json(proyecto)
    
}

const  eliminarProyecto = async (req,res) => {
    const {id} = req.params
    const proyecto = await Proyecto.findById(id)

    try {
        await proyecto.deleteOne()
        res.json({msj: 'PROYECTO ELMININADO'})
    } catch (error) {
        console.log(error)
    }
 
}

const buscarColaborador = async (req,res) => {
    const {email} = req.body;

    // Comprobar si el usuario exisre
    const usuario = await Usuario.findOne({email}).select('-confirmado -createdAt -password -updatedAt -token -__v') 

    if(!usuario){
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({msj: error.message})
    }

    res.json(usuario)

}
 
const  agregarColaborador = async (req,res) => {
}

const  eliminarColaborador= async (req,res) => {
}


export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    buscarColaborador,
    agregarColaborador,
    eliminarColaborador,
}