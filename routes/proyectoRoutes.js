import express from 'express'
import checkAuth from '../middlewares/checkAuth.js'
import checkCreador from '../middlewares/checkCreador.js'
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
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


router.put('/agregar-colaborador/:id',checkAuth,agregarColaborador)
router.put('/eliminar-colaborador/:id',checkAuth,eliminarColaborador)

export default router