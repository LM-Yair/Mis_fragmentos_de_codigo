const sendmail = async ({ name, email, message }) => {
  try {
    const emailLayout = get({
      path: path.join(__dirname, "./email.html"),
      options: {
        encoding: "utf-8",
      },
    });
    const emailHtmlReady = emailLayout
      .replace("${name}", name)
      .replace("${email}", email)
      .replace("${message}", message);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
	user: process.env.EMAIL_AUTH_USER, 
	pass: process.env.EMAIL_AUTH_PASS, 
      },
    });

    const emailStatus = await transporter.sendMail({
      from: `${name} - ${email}`,
      to: ["yairlazaro@outlook.com"],
      subject: "Portafolio - Contact Form",
      html: emailHtmlReady,
    });
    return {
      email: {
        statusCode: 200,
        statusText: {
          es: "email enviado",
          en: "email sent",
        },
        messageTime: emailStatus.messageTime,
        envelopeTime: emailStatus.envelopeTime,
        messageSize: emailStatus.messageSize,
      },
    };
  } catch (err) {
    throw {
      statusCode: 500,
      email: {
        statusText: {
          es: "El email no pudo ser enviado",
          en: "the email cannot be sent",
        },
        error: err,
      },
    };
  }
};

module.exports = {
  sendmail,
};
