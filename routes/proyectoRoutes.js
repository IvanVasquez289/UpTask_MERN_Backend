import express from 'express'
import checkAuth from '../middlewares/checkAuth.js'
import checkCreador from '../middlewares/checkCreador.js'
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    buscarColaborador,
    agregarColaborador,
    eliminarColaborador,
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
    .get(checkAuth,checkCreador,obtenerProyecto)
    .put(checkAuth,checkCreador,editarProyecto)
    .delete(checkAuth,checkCreador,eliminarProyecto)

router.post('/colaboradores',checkAuth,buscarColaborador)
router.post('/colaboradores/:id',checkAuth,agregarColaborador)
router.post('/eliminar-colaborador/:id',checkAuth,eliminarColaborador)

export default router