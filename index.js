import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const port = process.env.port;

app.use(cors())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
        user: process.env.user,
        pass: process.env.pass,
    },
})

try {
    await transporter.verify();
    console.log('server is ready to take requestes')
} catch (error) {
    console.log('error in connection', error)
}

try {
    const info = await transporter.sendMail({
        from: process.env.user,
        bcc: 'swamihimanshu78@gmail.com, iotaxerror@gmail.com',
        subject: "This is a test mail",
        text: "Hello from express",
        html: `<h2>This is a test</h2>`
    })
    console.log('Email sent', info.messageId)
} catch (error) {
    console.log("error sending mail", error)
}

app.listen(port, () => {
    console.log('server is running on port 4000')
})