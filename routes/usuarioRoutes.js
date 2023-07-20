import express from 'express'
import { registrar , autenticar, confirmar, olviderPassword} from '../controllers/usuarioController.js'
const router = express.Router()

// Autenticacion, creacion y confirmacion de usuarios
router.post('/',registrar)  //Crea un nuevo usuario
router.post('/login',autenticar)
router.get('/confirmar/:token',confirmar)
router.post('/olvide-password',olviderPassword)

export default router