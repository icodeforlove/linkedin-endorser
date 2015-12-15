"use strict";

var Promise = require('bluebird'),
	PromiseClass = require('promise-class'),
	request = require('request-promise'),
	debug = require('debug')('endorsor'),
	colors = require('colors');

module.exports = PromiseClass(class Endorser {
	constructor ($config) {
		this.csrf = $config.csrf;
		this.request = request.defaults({
			headers: {
				cookie: `li_at=${$config.li_at}; JSESSIONID="ajax:${this.csrf}"`,
				'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36',
				'x-firephp-version': '0.0.6'
			}
		});

		this.request.debug = true;
	}

	*start ($deferred) {
		var endorsements = yield this.getEndorsements();
		
		while (true) {
			debug(('found ' + String(endorsements.length).bold + ' endorsements').green);

			for (var endorsement = 0; endorsement < endorsements.length; endorsement++) {
				debug('- endorsing '.grey + String(endorsements[endorsement].endorsee.fullName).green + ' for '.grey + String(endorsements[endorsement].skillName).green);
				yield this.endorse(endorsements[endorsement]);
				
				var delay = 4000 + Math.floor(Math.random() * 10000);
				debug('- delaying '.grey + (delay +'ms').yellow);
				yield Promise.delay(delay);
			}

			debug('completed all endorsements, attempting again in 12 hours'.green);

			yield Promise.delay(60 * 60 * 12 * 1000);
		}

		$deferred.resolve();
	}

	*getEndorsements ($deferred) {
		var response = yield this.request({
			url: 'https://www.linkedin.com/hp/modules/ozfeed/promo/endorsements/fetch?offset=0&count=2000',
			json: true
		});

		$deferred.resolve(response.endorsements);
	}

	*endorse ($deferred, endorsement) {
		$deferred.resolve(yield this.request.post({
			url: 'https://www.linkedin.com/hp/modules/ozfeed/promo/endorsements/accept',
			form: {
				csrfToken: 'ajax:' + this.csrf,
				signature: endorsement.signature
			}
		}));
	}
});