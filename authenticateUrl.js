/* jshint esversion: 6*/

var fs = require('fs');
const {google} = require('googleapis');

var scopes=require('./scope');

function getAuthorizationUrl(cb)    {
    fs.readFile('authKeys.json',function(err,data) {
        if(err) {
            return cb(err);
        }
        
        var credentials = JSON.parse(data);
        var clientSecret = credentials.installed.client_secret;
        var clientId = credentials.installed.client_id;
        var redirectUrl = credentials.installed.redirect_uris[0];
        var oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
        var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        });
        return cb(null, authUrl);
    });
}

getAuthorizationUrl(function(err,url) {
    if(err) {
        console.log('err:',err);
    }
    else {
        console.log('Authorization Url is: \n',url);
    }
});