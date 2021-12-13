var express = require('express');
const sgMail = require('@sendgrid/mail')
const {SENDGRID_API} = require('../keys');
var router = express.Router();

sgMail.setApiKey(SENDGRID_API)

router.post('/', function (req, res) {
  const {username, email, subject, phone, message} = req.body;

  if(!(email || phone))
    throw new Error({error:'Please enter email or phone to contact you'});

  let mesgToSend = `${message || ""} -- By User - ${username} | Email - ${email} | Phone - ${phone} `;
  let htmlToSend = `<p> ${mesgToSend} </p>`;

  // TO - email who will receive the contact queries
  // from - email which is registeed at sendgrid to send Emails
  const sendGridMessage = {
    to: 'er.deepti2013@gmail.com',
    from: 'er.deepti.aggarwal@outlook.com',
    subject: subject || "",
    text: mesgToSend,
    html: htmlToSend
  }

  sgMail.send(sendGridMessage)
	.then(response => res.json({response}))
	.catch(error => {
    throw new Error('message send failed');
  });
})

module.exports = router;
