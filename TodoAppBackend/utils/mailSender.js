const nodemailer = require('nodemailer');
require('dotenv').config();

async function mailSender(email,title,body){
      try {
        // console.log("Email: ",email);
        // console.log("title: ",title);
        // console.log("body: ",body);

        const transporter = nodemailer.createTransport(
            {
                host:process.env.MAIL_HOST,
                auth:{
                    user:process.env.MAIL_USER,
                    pass:process.env.MAILPASS
                }
            }
        )
        let info = await transporter.sendMail({
            from: `Abhishek Nagar `,
            to: `${email}`,
            subject: `${title}`,
            html:`${body}`,
        })
        
        return info;

      } catch (error) {
        console.log('Error while sending mail',error)
        
      }
}
module.exports = mailSender;