import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const connection = await mongoose.connect(
            "mongodb+srv://root:ievr2891309@cluster0.kw4i0p1.mongodb.net/uptask?retryWrites=true&w=majority",{
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`MongoDB se ha conectado en: ${url}`)
    } catch (error) {
        console.log(`error: ${error.message}`)
        process.exit(1)
    }
}

export default conectarDB