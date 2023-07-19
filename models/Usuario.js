import mongoose from "mongoose";
import bcrypt from 'bcrypt'
// import generarId from "../helpers/generarId.js";
const usuarioSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        token: {
            type: String
        },
        confirmado: {
            type: Boolean,
            default: false,
         
        },
    },{
        timestamps: true,
    }
)

usuarioSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    // this.token = generarId()
    this.password = await bcrypt.hash(this.password,salt)

})

// usuarioSchema.methods.saludar = async function(){
//     console.log(`Hola ${this.nombre}`)
// }

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await  bcrypt.compare(passwordFormulario,this.password)
}

const Usuario = mongoose.model("Usuario",usuarioSchema)

export default Usuario;