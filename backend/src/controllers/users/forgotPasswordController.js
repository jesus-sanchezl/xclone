const crypto = require("crypto")

const sendEmail = require("../../utils/sendEmail");
const userEmailSchema = require("../../schemas/userEmailSchema");
const getUserByEmail = require("../../repositories/usersRepository/getUserByEmail");
const saveResetToken = require("../../repositories/usersRepository/saveResetToken");

const { BASE_URL  } = process.env;


const generateResetToken = () => {
    const token = crypto.randomBytes(32).toString("hex"); 
    const hash = crypto.createHash("sha256").update(token).digest("hex"); 
    return { token, hash };
};



const forgotPasswordController = async (req, res, next) => {
    try {
        const { email } = req.body;
        await userEmailSchema.validateAsync(email);

        const user = await getUserByEmail(email);

        if (user) {

            const { token, hash } = generateResetToken();

            


            const expiryDate = new Date(Date.now() + 3600000);

            await saveResetToken(user.id, hash, expiryDate);

            const resetLink = `${BASE_URL}/api/v1/users/reset-password?token=${token}`;
            await sendEmail(
                email,
                "Recuperación de contraseña",
                `
                    <p>Hola ${user.username},</p>

                    <p>Hemos recibido una solicitud para restablecer tu contraseña en <strong>XClone</strong>. 
                    Si no has sido tú, simplemente ignora este mensaje.</p>

                    <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>

                    <p><a href="${resetLink}" target="_blank">Restablecer contraseña</a></p>

                    <p>Este enlace será válido durante 1 hora.</p>

                    <br/>

                    <p>Un saludo,</p>
                    <p><strong>El equipo de XClone</strong></p>
                `
            );
        }

        res.send({
            status: "ok",
            message:
                "Si el correo existe, se ha enviado un enlace de recuperación.",
                data: null,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = forgotPasswordController;
