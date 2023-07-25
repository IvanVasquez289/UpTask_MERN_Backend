import express from 'express'
import checkAuth from '../middlewares/checkAuth.js'
import checkCreadorTarea from '../middlewares/checkCreadorTarea.js'
import { 
    nuevaTarea,
    obtenerTarea,
    editarTarea,
    eliminarTarea,
    cambiarEstado
} from '../controllers/tareaController.js'

const router = express.Router()

router.post('/',checkAuth,nuevaTarea)

router
    .route('/:id')
    .get(checkAuth,checkCreadorTarea,obtenerTarea)
    .put(checkAuth,checkCreadorTarea,editarTarea)
    .delete(checkAuth,checkCreadorTarea,eliminarTarea)

router.put('/estado/:id',checkAuth,cambiarEstado)


export default router