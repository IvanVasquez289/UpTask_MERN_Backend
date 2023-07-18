import express from 'express'
import dotenv from 'dotenv'
import conectarDB from './config/db.js';

const app = express();

dotenv.config()
console.log(process.env.HOLA)
conectarDB()

const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Corriendo en el servidor ${PORT}`)
})