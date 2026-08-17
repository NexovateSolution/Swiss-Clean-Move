import nodemailer from 'nodemailer';

async function testEmail() {
  console.log("SMTP_HOST:", process.env.SMTP_HOST);
  console.log("SMTP_USER:", process.env.SMTP_USER);
  console.log("SMTP_PASSWORD length:", process.env.SMTP_PASSWORD?.length);
  
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST?.trim(),
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: parseInt(process.env.SMTP_PORT || '465') === 465,
      auth: {
        user: process.env.SMTP_USER?.trim(),
        pass: process.env.SMTP_PASSWORD?.trim(),
      },
    });

    const info = await transporter.sendMail({
      from: `"SwissCleanMove" <${process.env.SMTP_USER?.trim()}>`,
      to: 'mikiyasdesalegn9@gmail.com', // test email
      subject: 'Test Email from SMTP',
      text: 'This is a test email sent from the newly configured SMTP server.',
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

testEmail();
