'use strict';

const OAuth = require('oauth');
const keys = require('../utils/keys.json');

let authenticate = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	keys.consumer.key,
	keys.consumer.secret,
	'1.0',
	'oob',
	'HMAC-SHA1'
);

module.exports = {
	requestToken () {
		authenticate.getOAuthRequestToken((error, OAuthToken, OAuthSecret, results) => {
			if (error) {
				return console.log(`${error.statusCode}: ${JSON.parse(error.data).errors[0].message}`);
			}

			console.log(`Authenticate: https://twitter.com/oauth/authorize?oauth_token=${OAuthToken}`);
			console.log(`Verify PIN: `);

			process.stdin.on('data', chunk => {
				let pin = chunk.toString().trim();

				this.accessToken(authenticate, OAuthToken, OAuthSecret, pin);
			});
		});
	},
	accessToken (authenticate, OAuthToken, OAuthSecret, pin) {
		authenticate.getOAuthAccessToken(OAuthToken, OAuthSecret, pin, (error, OAuthAccessToken, OAuthAccessTokenSecret, results) => {
			if (error) {
				return console.log(`${error.statusCode}: ${error.data}`);
			}
		});
	}
};
