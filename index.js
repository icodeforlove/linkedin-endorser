"use strict";

var Promise = require('bluebird'),
	PromiseClass = require('promise-class'),
	Endorser = require('./lib/Endorser'),
	config = require('config');

PromiseClass.wrap(function *() {
	var endorser = new Endorser({
		csrf: config.csrf_token,
		li_at: config.li_at
	});

	yield endorser.start();
})();