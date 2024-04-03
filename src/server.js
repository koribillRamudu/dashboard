const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'sekharramudu9054@gmail.com',
    pass: 'cgfo nzot twqy pfkd' // Replace with the actual app-specific password
  }
});

app.get('/applicationsData', (req, res) => {
  fs.readFile('applicationsData.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      res.status(500).send('Error reading data file');
      return;
    }
    const lines = data.split('\n');
    const applications = lines.map(line => {
      const [id, name, education, personalInfo, phoneNumber, email, status] = line.split(',');
      return { id, name, education, personalInfo, phoneNumber, email, status: status.trim() };
    });
    res.json(applications);
  });
});

app.post('/updateApplications', (req, res) => {
  const { applications } = req.body;
  const updatedData = applications.map(app => `${app.id},${app.name},${app.education},${app.personalInfo},${app.phoneNumber},${app.email},${app.status},${app.email}`).join('\n');

  fs.writeFile('applicationsData.txt', updatedData, 'utf8', err => {
    if (err) {
      console.error('Error updating data file:', err);
      res.status(500).send('Error updating data file');
      return;
    }
    res.status(200).send('Data updated successfully');
  });
});

// POST route to send email
app.post('/sendEmail', (req, res) => {
  const { recipientEmail, subject, text } = req.body;

  const mailOptions = {
    from: 'sekharramudu9054@gmail.com',
    to: recipientEmail,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
