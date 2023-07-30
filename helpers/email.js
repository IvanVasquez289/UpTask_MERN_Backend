import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
    const {nombre,email,token} = datos;

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7fa993761f6729",
          pass: "54ccd9409e0844"
        }
    });

    const info = await transport.sendMail({
        from: '"UpTask-MERN - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Comprueba tu cuenta" ,
        text: "Comprueba tu cuenta en UpTask",
        html: `
            <p>Hola: ${nombre}, Comprueba tu cuenta en UpTask</p>
            <p>Tu cuenta ya casi esta lista, solo debes comprobarla en el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}">Comprobar Cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje.</p>

        `
    })
}
export const emailOlvidePassword = async (datos) => {
    const {nombre,email,token} = datos;

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7fa993761f6729",
          pass: "54ccd9409e0844"
        }
    });

    const info = await transport.sendMail({
        from: '"UpTask-MERN - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Reestablece tu Password" ,
        text: "Reestablece tu Password",
        html: `
            <p>Hola: ${nombre}, has solicitado reestablecer tu password</p>
            <p>Sigue el siguiente enlace para generar un nuevo password:</p>
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
            <p>Si tu no solicitaste cambiar tu password, puedes ignorar este mensaje.</p>

        `
    })
}