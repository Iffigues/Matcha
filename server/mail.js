var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	 service: 'gmail',
	 auth: {
		         user: 'matchapeur@gmail.com',
		         pass: 'Petassia01'
		     }
});

function opts(tos, subj, text) {
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
	});
}

module.exports = sendMail;
