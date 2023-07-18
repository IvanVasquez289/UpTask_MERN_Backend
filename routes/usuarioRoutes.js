import express from 'express'

const router = express.Router()

router.get('/',(req,res)=>{
    res.send('Desde api/usuarios')
})
router.post('/',(req,res)=>{
    res.send('metodo post')
})

export default router