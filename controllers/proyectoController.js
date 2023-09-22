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
    const proyecto = await Proyecto.findById(id).populate('tareas').populate('colaboradores', 'nombre email')

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
    const proyecto = await Proyecto.findById(req.params.id)

    // * Verificar si el proyecto existe
    if(!proyecto){
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({msj:error.message})
    }
    
    // * Validar si es el creador del proyecto quien esta agregando un colaborador
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Accion no valida')
        return res.status(404).json({msj:error.message})
    }

    // ? Verificar si el usuario existe
    const {email} = req.body;
    const usuario = await Usuario.findOne({email}).select('-confirmado -createdAt -password -updatedAt -token -__v') 

    if(!usuario){
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({msj: error.message})
    }

    // ? Validar que el creador no se agregue asi mismo como colaborador
    if(proyecto.creador.toString() === usuario._id.toString()){
        const error = new Error('El creador del proyecto no puede ser colaborador')
        return res.status(404).json({msj: error.message})
    }

    // ? Validar que no se encuentre ya agregado al proyecto
    if(proyecto.colaboradores.includes(usuario._id)){
        const error = new Error('El usuario ya pertenece al proyecto')
        return res.status(404).json({msj: error.message})
    }

    // * Paso la validacion, se puede agregar
    proyecto.colaboradores.push(usuario._id)
    await proyecto.save()
    res.json({msj: 'Colaborador agregado correctamente'})
    console.log(req.body)
}

const  eliminarColaborador= async (req,res) => {
    const proyecto = await Proyecto.findById(req.params.id)
    
    // * Verificar si el proyecto existe
    if(!proyecto){
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({msj:error.message})
    }
    
    // * Validar si es el creador del proyecto quien esta eliminando un colaborador
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Accion no valida')
        return res.status(404).json({msj:error.message})
    }

    // * Paso la validacion, se puede eliminar
    proyecto.colaboradores.pull(req.body.id)
    await proyecto.save()
    res.json({msj: 'Colaborador eliminado correctamente'})
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