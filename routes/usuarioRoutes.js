import express from 'express'
import { 
    registrar,
    autenticar, 
    confirmar, 
    olviderPassword,
    comprobarToken,
    nuevoPassword,
    perfil
} from '../controllers/usuarioController.js'
import checkAuth from '../middlewares/checkAuth.js'

const router = express.Router()

// Autenticacion, creacion y confirmacion de usuarios
router.post('/',registrar)  //Crea un nuevo usuario
router.post('/login',autenticar)
router.get('/confirmar/:token',confirmar)
router.post('/olvide-password',olviderPassword)
// router.get('/olvide-password/:token',comprobarToken)
// router.post('/olvide-password/:token',nuevoPassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)  //Esta linea equivale a las dos de arriba
router.get('/perfil',checkAuth,perfil)

export default router