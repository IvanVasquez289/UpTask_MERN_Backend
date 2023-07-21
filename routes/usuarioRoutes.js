import express from 'express'
import { 
    registrar,
    autenticar, 
    confirmar, 
    olviderPassword,
    comprobarToken,
    nuevoPassword
} from '../controllers/usuarioController.js'
const router = express.Router()

// Autenticacion, creacion y confirmacion de usuarios
router.post('/',registrar)  //Crea un nuevo usuario
router.post('/login',autenticar)
router.get('/confirmar/:token',confirmar)
router.post('/olvide-password',olviderPassword)
// router.get('/olvide-password/:token',comprobarToken)
// router.post('/olvide-password/:token',nuevoPassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)  //Esta linea equivale a las dos de arriba

export default router