const nodemailer = require("nodemailer");
const { generateError } = require("./helpers")


const { EMAIL_USER, EMAIL_PASSWORD } = process.env

const transporter = nodemailer.createTransport({
     service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
    },
});

const sendEmail = async (to, subject, htmlContent) => {
    try {
        const info = await transporter.sendMail({
            from: `XClone <${EMAIL_USER}>`,
            to,
            subject,
            html: htmlContent,
        });

        return info;

        
    } catch (error) {
        console.error("Error enviando correo:", error);
         throw generateError("Error enviando correo", 500);
    }
};

module.exports = sendEmail;
