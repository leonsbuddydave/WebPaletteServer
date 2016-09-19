'use strict';

var express = require('express');
var argv = require('yargs').argv;
var LocalFileCommandMapPopulator = require('./LocalFileCommandMapPopulator');
var RegexItemMap = require('./RegexItemMap');

const APP = express();
const PORT = 6969;

const itemMap = new RegexItemMap();

if (argv.mode === 'dev') {
	console.info('Running in development mode; pulling command maps from local file system.');
	const populator = new LocalFileCommandMapPopulator(itemMap, argv.commandMapDir);
} else {
	throw new Error('Non-development mode not supported yet.');
}

APP.get('/', (req, res) => {
	var maps = itemMap.get(req.query.url);
	res.json({
		maps: (maps || {})
	});
});

APP.listen(PORT, () => {
	console.log('Server listening on 6969');
});