var express = require('express');
var router = express.Router();
var utils  = require('../lib/utils');
var users  = require('../lib/users');

router.get('/api/vidoes', function(req, res, next) {
	var q = utils.common(req.query);
	utils.search(q, function(err, result) {
		res.status(200).send(result.hits);
	})
});

/* GET home page. */
router.get('/', function(req, res, next) {
	var q = utils.common(req.query);
	utils.search(q, function(err, result) {
		result.pages = utils.helper(req.query, result.total);
		result.params = req.query
		res.render("index", result);
	})
});

router.get('/dota2', function(req, res, next) {
	var q = utils.common(req.query, 'dota2');
	utils.search(q, function(err, result) {
		result.pages = utils.helper(req.query, result.total, 'dota2');
		result.params = req.query
		res.render("index", result);
	})
});

router.get('/dota', function(req, res, next) {
	var q = utils.common(req.query, 'dota');
	utils.search(q, function(err, result) {
		result.params = req.query
		result.pages = utils.helper(req.query, result.total, 'dota');
		res.render("index", result);
	})
});

router.get('/author', function(req, res, next) {
	params = req.query;
	params.users = users;
	res.render("user", params);
});


module.exports = router;
