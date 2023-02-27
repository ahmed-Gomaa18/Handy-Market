const nodemailer = require("nodemailer");


async function sendEmail(dest , message)
{
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        requireTLS:true,
        auth: {
          user: process.env.SENDER_EMAIL, // generated ethereal user
          pass: process.env.SENDER_PASSWORD, // generated ethereal password
        },
   });
    
      // send mail with defined transport object
        let mailOpations = {
        from: `"Fred Foo 👻" <${process.env.SENDER_EMAIL}>`, // sender address
        to: dest, // list of receivers
        subject: "Hendy Market", // Subject line
        text: "Hello world?", // plain text body
        html:message  // html body
        };


        transporter.sendMail(mailOpations , (error, info)=>{
            if(error){
                return error
            }
        })
}



module.exports = sendEmail