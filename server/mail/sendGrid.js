// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const adminEmail = 'toolerino1@gmail.com'
const requestSubject = 'new request for gear use'

function sendRequest(details) {
  const {item, requester, messageBody} = details
  console.log(item);
  
  const requestBodyHTML = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Nuts & Bolts</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
<body style="fontcolor:black;">
  <div style="padding:40px; background-color: #777777; max-width: 525px;">
  <div style="padding:10px; background-color: #FFFFFF; max-width: 500px;">
  <h1 style="text-align: center;"><img style="height: 1em; padding-right: 15px;" src="https://nuts-bolts.herokuapp.com/icon/sample_icon-512.png"/>Nuts & Bolts<img style="height: 1em; padding-left: 15px;" src="https://nuts-bolts.herokuapp.com/icon/sample_icon-512.png"/></h1>
  <h2 style="b">Hey ${item.first_name},</h2>
  ${requester.user_name} wants to use your <a href='https://nuts-bolts.herokuapp.com/#/item/${item.id}'>${item.name}</a>.
  <br><br>
  Their message:
  <br><br>
  <div style="padding: 20px 20px 20px 20px; border-radius: 10px; background-color: pink;">
    ${messageBody}
  </div>
  <br>
  It'd be awesome if you could touch base with them at ${requester.email_address} ASAP.
  <br><br>
  Thanks for getting involved!
  <br><br>
  Have an awesome day!
  </div></div>
  </body>
  </html>`


  return new Promise((resolve, reject) => {
    const msg = {
      to: item.email_address,
      from: adminEmail,
      subject: requestSubject,
      html: requestBodyHTML,
      generateTextFromHTML: true
    };
    sgMail.send(msg, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    });
  })
}

module.exports = {
  sendRequest
}
