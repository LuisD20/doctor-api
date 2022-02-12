const nodemailer = require('nodemailer');
//const pug = require('pug');
//const htmlToText = require('html-to-text');

module.exports = class Email 
{
    constructor(user, url)
    {
        this.to = user.email;
        this.name = user.name.split(' ')[0];
        this.url = url;
        this.from = `Luis Monsalve ${process.env.EMAIL_FROM}`
    }

    createTransport()
    {
        if(process.env.NODE_ENV === 'production')
        {
            return 1;
        }

        return nodemailer.createTransport
        (
            {
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: 
                {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            }
        )
    }

    async resetPassword(message)
    {
        
        await this.send('Restauracion de contraseña', message)
    }

    async send(subject, template)
    {
        /*
        const Html = pug.renderFile(`${__dirname}/../Views/Emails/${Template}.pug`,
        {
            name: this.FirstName,
            url: this.URL,
            email: this.To,
            Subject
        });
        */

        const mailOptions =
        {
            from: this.from,
            to: this.to,
            subject: subject,
            //html: Html,
            text: template,
        }

        await this.createTransport().sendMail(mailOptions);
    }
}