const config = require('config');
const mailer = require('../utils/mailer');
const hostFront = config.get('Customer.front.host');

const mailerConfig = config.get('Customer.transporter');

function messageBody(id) {
    return `
    <html>
        <head>
            <style>
                * {
                    display: flex;
                }
                hr {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <h3>Confirmá tu correo electrónico</h3>
            <p>Para accedera tu cuenta y trabajar con el test de Caras-R confirmé su registro.</p>
            <br/>
            <a href="${hostFront + 'confirmation/' + id}">CONFIRMAR</a>
        </body>
    </html>
    
    `
}

let sendConfirmation = function (req, res) {

    let mailOptions = {
        from: `"Caras-R" <${mailerConfig.remitent}>`,
        to: req.body.email,
        subject: 'Conformación de registro',
        html: messageBody(req.body.id)
    };

    mailer.transporter.sendMail(mailOptions)
        .then(response => {
            return res.status(200).send({message: 'Se ha enviado un mail para confirmar su correo electrónico'});
        })
        .catch(err => {
            console.log(console.error(err));
            return res.status(500).send({message: 'Se ha producido un error al enviar el email de confirmación'});
        })
}

const mailerFunctions = {
    sendConfirmation
};

module.exports = mailerFunctions