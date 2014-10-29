var OAuth = require('oauth').OAuth;
var key = require('../config.json');

var twitterOAuth = new OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	key.consumer.key,
	key.consumer.secret,
	'1.0A',
	'oob',
	'HMAC-SHA1'
);

exports.requestToken = function(callback) {
	twitterOAuth.getOAuthRequestToken(function (error, requestToken, requestTokenSecret) {
		if (error) {
			console.log('Error requesting Request Token');
		}

		callback(null, requestToken, requestTokenSecret);


	});
};

exports.accessToken = function(requestToken, requestTokenSecret, pin, callback) {
	twitterOAuth.getOAuthAccessToken(requestToken, requestTokenSecret, pin, function(error, accessToken, accessTokenSecret, param) {
		if (error) {
			console.log('Error requesting Access Token');
		}

		callback(null, accessToken, accessTokenSecret, param);
	});
};