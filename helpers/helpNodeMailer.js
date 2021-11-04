const sendEmail = async ({ name, email, options, message }) => {
  try{
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, 
      auth: {
	user: 'ylm508910@gmail.com', 
	pass: 'kmvributotewhafp', 
      },
    });
    transporter.verify().catch( err => console.error( err ) );
    await transporter.sendMail({
      from: `"Portafolio "<${ email }>`, 
      to: "yairlazaro@outlook.com", 
      subject: `Portafolio | ${ options }`, 
      text: `${ message }`, 
      html: `
      <h2>De: ${ name }</h2>
      <h3>${ email }</h3>
      <p>${ message }</p>`,
    });
  }
  catch( err ){ console.error( err ) };
}

export default sendEmail;
