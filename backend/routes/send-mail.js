const nodemailer = require("nodemailer");

async function sendEmail(email, subject, message) {
  // create reusable transporter object using the default SMTP transport
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      // true for 465, false for other ports
      auth: {
        user: "catalog.electronic2021@gmail.com", // generated ethereal user
        pass: "catalog123", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Catalogul electronic 👻" <catalog.electronic2021@gmail.com>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: "Buna ziua!", // plain text body
      html: message, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log(err);
  }
}

module.exports = { sendEmail };
