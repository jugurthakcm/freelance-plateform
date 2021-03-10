const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');

exports.sendMail = async (email, userEmail) => {
  try {
    const filePath = path.join(
      __dirname + '/templates/confirmEmail.handlebars'
    );

    const source = fs.readFileSync(filePath, 'utf-8').toString();

    const template = hbs.compile(source);
    const replacements = {
      username: 'Jugurtha',
    };
    const htmlToSend = template(replacements);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    return await transporter.sendMail({
      from: 'Handelp',
      to: userEmail,
      subject: email.subject,
      html: htmlToSend,
    });
  } catch (error) {
    return error;
  }
};
