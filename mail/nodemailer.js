const nodemailer = require('nodemailer');

exports.sendMail = async (email, userEmail) => {
  try {
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
      html: email.html,
    });
  } catch (error) {
    return error;
  }
};
