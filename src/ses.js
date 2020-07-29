const aws = require('aws-sdk');

let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env; 
} else {
    secrets = require('../secrets.json'); 
}

const ses = new aws.SES({
    accessKeyId: secrets.aws.AWS_KEY,
    secretAccessKey: secrets.aws.AWS_SECRET,
    region: 'eu-west-1'
});

exports.sendEmail = function (to, subject, message) {
    return ses.sendEmail({
        Source: "Raisa Mariotto <mariottoraisa@gmail.com>",
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Body: {
                Text: {
                    Data: message,
                }
            },
            Subject: {
                Data: subject,
            }
        }
    }).promise()
        .then(() => console.log('it worked!'))
        .catch(err => console.log('err in sendEmail ',err));
};


