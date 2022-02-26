"use strict";
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail")

async function sendEmail(data) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    from: 'info@makeitreal.camp',
    to: data.to,
    subject: data.subject,
    template_id: data.template_id,
    dynamic_template_data: data.dynamic_template_data
  }
  try {
    const result = await sgMail.send(msg)
    console.log('Correo enviado exitosamente', result)
  } catch(err) {
    console.log(err)
  }
 
}


async function main() {
  
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: 'leonel.oliveros@makeitreal.camp', 
      pass: 'pbvaqlmmtzkiujnu', 
    },
  });

  
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', 
    to: "leoneloliveros.co@gmail.com", 
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: `
      <style>
        .title {
          color: pink
        }
      </style>
      <b class="title">Hello world?</b>
      <b>Aqui se encuentra la info</b>
    
    `, 
  });

  console.log("Message sent: %s", info.messageId);
  

  
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
}

module.exports = {
  sendEmail
}
