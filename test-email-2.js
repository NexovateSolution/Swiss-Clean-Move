const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'mikiyasdesalegn9@gmail.com', pass: 'fbclydyyquklldqc' }
});

transporter.sendMail({
  from: 'mikiyasdesalegn9@gmail.com',
  to: 'mikiyasdesalegn9@gmail.com',
  subject: 'Test Email',
  text: 'This is a test'
}).then(info => {
  console.log('Success:', info.messageId);
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
