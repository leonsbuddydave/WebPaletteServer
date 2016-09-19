'use strict';

var CommandMapFile = require('./CommandMapFile');
var glob = require('glob');
var fs = require('fs');

class LocalFileCommandMapPopulator {

	/**
	 * @param  {RegexItemMap} regexItemMap A regex map to populate
	 * @param  {} directory    [description]
	 * @return {[type]}              [description]
	 */
	constructor(regexItemMap, directory) {
		this.regexItemMap = regexItemMap;
		this.directory = directory;

		// Refresh, and then set a
		// timer for it to happen again
		this.refresh(() => {
			this.regexItemMap.setKeys(['stackoverflow.com', 'www.stackoverflow.com', 'google.com']);
			setInterval(() => {
				this.refresh();
			}, 10000);
		});
	}

	refresh(cb) {
		glob(this.directory + '*.js', (err, files) => {
			var maps = files.map((file) => {
				return new CommandMapFile( file );
			});
			this.regexItemMap.setItems(maps);
			cb && cb();
		});
	}
}

module.exports = LocalFileCommandMapPopulator