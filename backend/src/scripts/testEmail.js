require("dotenv").config();
const sendEmail = require("../utils/sendEmail");

const testEmail = async () => {
    try {
        await sendEmail(
            "noreply.xclone@gmail.com",
            "Prueba de XClone",
            `<h2>Esto es una prueba</h2>
     <p>Si ves este mensaje en HTML, todo funciona correctamente.</p>`
        );
        console.log("Correo enviado exitosamente.");
    } catch (error) {
        console.error("Error:", error);
    }
};

testEmail();
