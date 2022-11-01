import nodemailer from 'nodemailer';
import fs from 'fs';

export const get = ({ path = "", options }) => {
  try {
    const file = fs.readFileSync(path, options);
    return file;
  } catch (err) {
    const fileName = path.split("/").pop();
    throw {
      statusCode: 500,
      statusText: {
        es: `ocurrió un error con el archivo '${fileName}'`,
        en: `an error ocurred with the '${fileName}' file`,
      },
      err,
    };
  }
};

export const getHtmlLayout = (absolute_path) => {
  try {
    const htmlpath = absolute_path || "./email.html";
    const emailLayout = get({
      htmlpath,
      options: {
        encoding: "utf-8",
      },
    });
    return emailLayout;
  } catch (err) {
    return false;
  }
};

export const getHtmlReady = ({
  title = "email - nodemailer",
  name = "",
  email = "",
  message = "message from nodemailer",
  emailLayout = "",
}) => {
  let messageReady = "";
  if (typeof message === "string") messageReady = message;
  else if (Array.isArray(message)) {
    messageReady = message.map((data) => `<p>${data}</p>`).join("<br>");
  }
  return emailLayout
    .replace("${title}", title)
    .replace("${name}", name)
    .replace("${email}", email)
    .replace("${message}", messageReady);
};

export const sendmail = async ({ from, to, subject, html }) => {
  try {
    const toIsValid = [Array.isArray(to), typeof to === "string"].includes(
      true
    );

    if (typeof from !== "string") {
      throw {
        statusText: {
          es: "'from' debe se de tipo string",
          en: "'from' to be type string",
        },
      };
    }
    if (!toIsValid)
      throw {
        statusText: {
          es: "'to' debe se de tipo array o string",
          en: "'to' to be type array or string",
        },
      };
    if (!subject)
      throw {
        statusText: {
          es: "'subject' debe se de tipo array o string",
          en: "'subject' to be type array or string",
        },
      };
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
      from,
      to,
      subject,
      html,
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
        ...err,
      },
    };
  }
};
