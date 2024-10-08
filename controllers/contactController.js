require("dotenv").config();
const nodemailer = require('nodemailer');

exports.getContact = async(req, res) => {
    try {
        res.render("contact-us");
    } catch (error) {
        console.log(error);
    }
}


const emailConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
    }
}

const mailTransporter = nodemailer.createTransport(emailConfig);

exports.sendMessage = (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: name,
        to: process.env.EMAIL,
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    }

    mailTransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            // console.log('Email sent: ' + info.response);
            res.redirect('/contact-us');
        }
    })
}
