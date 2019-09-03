var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	 service: 'gmail',
	 auth: {
		         user: 'matchapeur@gmail.com',
		         pass: 'Petassia01'
		     }
});

function opts(tos, subj, text) {
	console.log(tos)
	return {
		  from: 'matchapeur@gmail.com',
		  to: tos,
		  subject: subj,
		  html: text
	};
}

function sendMail(tos, subj, text){
	const mailOptions = opts(tos, subj, text);
	transporter.sendMail(mailOptions, function (err, info) {
		   if(err)
			     console.log(err)
		   else
			     console.log(info);
	});
}

module.exports = sendMail;
