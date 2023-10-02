import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'
const app = express();

app.use(express.json())
dotenv.config()
conectarDB()

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function(origin,callback){
        if(whitelist.includes(origin)){
            // Puede consultar la API
            callback(null, true)
        }else{
            // No esta permitido
            callback(new Error("Error de CORS"))
        }
    }
}

app.use(cors(corsOptions))
// ROUTING
app.use('/api/usuarios',usuarioRoutes)
app.use('/api/proyectos',proyectoRoutes)
app.use('/api/tareas',tareaRoutes)

const PORT = process.env.PORT || 4000;

const servidor = app.listen(PORT,()=>{
    console.log(`Corriendo en el servidor ${PORT}`)
})

// Socket.io
import { Server } from 'socket.io';

const io = new Server(servidor,{
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL
    }
})

io.on('connection',(socket) => {
    console.log('Conectado a socket.io')

    // Definir los eventos de socket io
    socket.on('abrir proyecto', (proyectoId) => {
        socket.join(proyectoId)
        socket.to("64e6e22d251e3f670237f0b6").emit('respuesta', {nombre: 'Ivan'})
    })
})