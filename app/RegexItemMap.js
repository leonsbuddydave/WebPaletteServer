'use strict';

module.exports = class RegexItemMap {
	constructor() {
		this.keys = [];
		this.items = [];

		this.hash = {};
	}

	rebuild() {
		var hash = {};

		// If we don't have anything to build a map from,
		// clear the map and exit early
		if (this.keys.length === 0 || this.items.length === 0) {
			this.hash = {};
			return;
		} else {
			this.keys.forEach((key) => {
				console.log('Key: ' + key);
				this.items.forEach((item) => {
					console.log('-- Item: ' + item.metadata.name);
					var match = item.getRegexes().some((reg) => {
						console.log('-- -- Regex: ' + reg);
						return reg.test(key);
					});

					if (match) {
						if (typeof this.hash[key] === 'undefined') {
							this.hash[key] = [];	
						}
						this.hash[key].push(item);
					}
				});
			});
		}
	}

	setKeys(keys) {
		this.keys = keys;
		this.rebuild();
	}

	setItems(items) {
		this.items = items;
		this.rebuild();
	}
}