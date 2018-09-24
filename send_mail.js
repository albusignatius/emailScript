/*jshint esversion: 6*/

var fs = require('fs');
const {google} = require('googleapis');

function getOAuth2Client(cb) {
    fs.readFile('authKeys.json', function(err,data) {
        if(err) {
            return cb(err);
        }
        var credentials = JSON.parse(data);
        var clientSecret = credentials.installed.client_secret;
        var clientId = credentials.installed.client_id;
        var redirectUrl = credentials.installed.redirect_uris[0];
        var oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);

        //Load authentication data

        fs.readFile('authenticationTokenFile.json', function(err,token) {
            if(err) {
                return cb(err);
            }
            else {
                oauth2Client.credentials = JSON.parse(token);
                return cb(null, oauth2Client);
            }
        });
    });
}



function sendSampleMail(auth,cb) {
    var gmailClass = google.gmail('v1');
    var email_Lines = [];

    email_Lines.push('From: "<your identity goes here>" <yourmail@gmail.com>');
    email_Lines.push('To: receivers gmail address');
    email_Lines.push('Content-type: text/html;charset=iso-8859-1');
    email_Lines.push('MIME-Version: 1.0');
    email_Lines.push('Subject: <subject here>');
    email_Lines.push('');
    email_Lines.push('A sample body which is to be written and edited using HTML.');

    var email = email_Lines.join('\r\n').trim();

    var base64EncodedEmail = new Buffer(email).toString('base64');
    base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '-');

    gmailClass.users.messages.send({
        auth: auth,
        userId: 'me',
        resource: {
            raw: base64EncodedEmail
        }
    }, cb);
}


getOAuth2Client(function(err, oauth2Client) {
    if(err) {
        console.log('err: ',err);
    }
    else {
        sendSampleMail(oauth2Client, function(err, results) {
            if(err) {
                console.log('err: ',err);
            }
            else {
                console.log(results);
            }
        });
    }
});