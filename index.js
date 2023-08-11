const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions ={
  origin:'*', 
  method : 'GET,PUT,POST,DELETE,OPTIONS',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.post('/send-email', async (req, res) => {

  const { email, sujet, objet, name } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'outlook', // E.g., 'gmail'
      auth: {
        user: 'maxencemazeau@outlook.fr',
        pass: '9149678212Ma',
      },
    });

    const emailMessage = {
      from: 'maxencemazeau@outlook.fr',
      to: 'maxencemazeau@outlook.fr',
      subject: `${sujet}`,
      text: `From ${email}, ${name}. Objet : ${objet}`,
    };


    const sendEmailResponse = await transporter.sendMail(emailMessage);

    console.log('Email sent successfully:', sendEmailResponse);

    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);

    res.status(500).json({ error: 'An error occurred while sending the email' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
