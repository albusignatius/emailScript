/* jshint esversion: 6*/

var fs = require('fs');
const {google} = require('googleapis');

function getAuthorizationToken(code,cb)    {
    fs.readFile('authKeys.json',function(err,data) {
        if(err) {
            return cb(err);
        }
        
        var credentials = JSON.parse(data);
        var clientSecret = credentials.installed.client_secret;
        var clientId = credentials.installed.client_id;
        var redirectUrl = credentials.installed.redirect_uris[0];
        var oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
        oauth2Client.getToken(code, function(err, token){
            if(err) {
                return cb(err);
            }
            var credentialsFile = 'authenticationTokenFile.json';

            fs.writeFile(credentialsFile, JSON.stringify(token), (err)=> {
                if (err) return console.error(err);
                console.log('Token stored to', credentialsFile);
            });
            return cb(null, credentialsFile);
        });
    });
}

if(process.argv.length!=3) {
    console.log('usage: node get_token token');
    process.exit(1);
}

var token = process.argv[2];

getAuthorizationToken(token, function(err,credentialsFile) {
    if(err) {
        console.log('err:',err);
    }
    else {
        console.log('Authorization token is in: \n',credentialsFile);
    }
});