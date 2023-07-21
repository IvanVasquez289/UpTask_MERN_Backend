import express from 'express'
import { 
    registrar,
    autenticar, 
    confirmar, 
    olviderPassword,
    comprobarToken
} from '../controllers/usuarioController.js'
const router = express.Router()

// Autenticacion, creacion y confirmacion de usuarios
router.post('/',registrar)  //Crea un nuevo usuario
router.post('/login',autenticar)
router.get('/confirmar/:token',confirmar)
router.post('/olvide-password',olviderPassword)
router.get('/olvide-password/:token',comprobarToken)

export default router