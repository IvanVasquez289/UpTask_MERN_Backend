import express from 'express'
import checkAuth from '../middlewares/checkAuth.js'
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
    .get(checkAuth,obtenerTarea)
    .put(checkAuth,editarTarea)
    .delete(checkAuth,eliminarTarea)

router.put('/estado/:id',checkAuth,cambiarEstado)


export default router