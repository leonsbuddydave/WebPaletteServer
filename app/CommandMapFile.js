'use strict';

var fs = require('fs');

var UNIQUE_FIELDS = ['name'];

module.exports = class CommandMapFile {
	constructor(file) {
		this.contents = fs.readFileSync(file, 'utf-8');
		this.metadata = {};
		this.regexes = null;
		this.parseMetadata();
	}

	getRegexes() {
		if (this.regexes) {
			return this.regexes;
		} else {
			this.regexes = (this.metadata['include'] || []).map((r) => {
				return new RegExp(r);
			})
		}
		return this.regexes;
	}

	parseMetadata() {
		this.metadata = {};
		this.contents.split(/\n/g).some((line) => {
			if (line.trim().indexOf('//') === 0) {
				var parts = line.split(' ');
				var key = parts[1].replace('@', '');
				var value = parts.splice(2).join(' ');

				if (typeof this.metadata[key] === 'undefined') {
					this.metadata[key] = [];
				}
				this.metadata[key].push(value.trim());
			} else {
				return true;
			}
		});

		// For 'unique' fields, we just take the first one
		UNIQUE_FIELDS.forEach((field) => {
			if (typeof this.metadata[field] !== 'undefined') {
				this.metadata[field] = this.metadata[field][0];
			}	
		})
	}
}