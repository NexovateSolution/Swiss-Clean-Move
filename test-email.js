const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mikiyasdesalegn9@gmail.com',
    pass: 'tufptmkjhstwelcf',
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Validation Error:');
    console.error(error);
    process.exit(1);
  } else {
    console.log('SMTP connection successful! Credentials are valid.', success);
    process.exit(0);
  }
});
