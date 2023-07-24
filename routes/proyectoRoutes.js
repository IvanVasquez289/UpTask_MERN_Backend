import express from 'express'
import checkAuth from '../middlewares/checkAuth.js'
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas
} from '../controllers/proyectoController.js'

const router = express.Router()

// router.get('/',checkAuth,obtenerProyectos)
// router.post('/',checkAuth,nuevoProyecto)

router
    .route('/')
    .get(checkAuth,obtenerProyectos)
    .post(checkAuth,nuevoProyecto)

router
    .route('/:id')
    .get(checkAuth,obtenerProyecto)
    .put(checkAuth,editarProyecto)
    .delete(checkAuth,eliminarProyecto)

router.get('/tareas/:id',checkAuth,obtenerTareas)

router.put('/agregar-colaborador/:id',checkAuth,agregarColaborador)
router.put('/eliminar-colaborador/:id',checkAuth,eliminarColaborador)

export default router