import nodemailer from 'nodemailer';

const sendPasswordResetEmail = (email, defaultPassword) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alexndegwa49@gmail.com',
      pass: 'huumwjugrxugghzq',
    },
  });

  const message = `
    <p>Your password has been reset to: <strong>${defaultPassword}</strong></p>
    <p>Please reset it to your preferred password.</p>
  `;

  const mailOptions = {
    from: 'alexndegwa49@gmail.com',
    to: email,
    subject: 'Zuridesk Password Reset',
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const sendWelcome = async (email, message) => {
    const transporter = nodemailer.createTransport({
     service: 'Gmail',
     auth: {
       user: 'alexndegwa49@gmail.com', 
       pass: 'huumwjugrxugghzq', 
     },
   });
 
   const mailOptions = {
     from: 'alexndegwa49@gmail.com', 
     to: email,
     subject: 'Hodari Homes newsletter',
     text: `${message}`,
   };
 
   await transporter.sendMail(mailOptions);
 };

const sendNewsletter = async (email, message) => {
   const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'alexndegwa49@gmail.com', 
      pass: 'huumwjugrxugghzq', 
    },
  });

  const mailOptions = {
    from: 'alexndegwa49@gmail.com', 
    to: email,
    subject: 'Hodari Homes newsletter',
    text: `${message}`,
  };

  await transporter.sendMail(mailOptions);
};

const sendUnsubsribeNewsletter = async (email, message) => {
   const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'alexndegwa49@gmail.com', 
      pass: 'huumwjugrxugghzq', 
    },
  });

  const mailOptions = {
    from: 'alexndegwa49@gmail.com', 
    to: email,
    subject: 'Hodari Homes newsletter.',
    text: `${message}`,
  };

  await transporter.sendMail(mailOptions);
};

const sendResubscribeNewsletter = async (email, message) => {
  const transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
     user: 'alexndegwa49@gmail.com', 
     pass: 'huumwjugrxugghzq', 
   },
 });

 const mailOptions = {
   from: 'alexndegwa49@gmail.com', 
   to: email,
   subject: 'Hodari Homes newsletter.',
   text: `${message}`,
 };

 await transporter.sendMail(mailOptions);
};

export { 
  sendPasswordResetEmail,
  sendWelcome,
  sendNewsletter,
  sendUnsubsribeNewsletter,
  sendResubscribeNewsletter,
};
