'use strict';

var CommandMapFile = require('./CommandMapFile');
var glob = require('glob');
var fs = require('fs');

module.exports = class LocalFileCommandMapPopulator {
	constructor(regexItemMap, directory) {
		this.regexItemMap = regexItemMap;
		this.directory = directory;

		// Refresh, and then set a
		// timer for it to happen again
		this.refresh(() => {
			this.regexItemMap.setKeys(['stackoverflow.com']);
			setInterval(() => {
				this.refresh();
			}, 10000);
		});
	}

	refresh(cb) {
		glob(this.directory + '*.js', (err, files) => {
			var maps = files.map((file) => {
				return new CommandMapFile( fs.readFileSync(file, 'utf-8') );
			});
			this.regexItemMap.setItems(maps);
			cb && cb();
		});
	}
}