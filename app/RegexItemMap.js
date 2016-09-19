'use strict';

class RegexItemMap {
	constructor() {
		this.keys = [];
		this.items = [];
		this.index = {};
	}

	rebuild() {
		var index = {};

		// If we don't have anything to build a map from,
		// clear the map and exit early
		if (this.keys.length === 0 || this.items.length === 0) {
			this.index = {};
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
						if (typeof index[key] === 'undefined') {
							index[key] = [];	
						}
						index[key].push(item);
					}
				});
			});
			this.index = index;
		}
		this.printIndex();
	}

	/**
	 * Logs a visual representation of the index in the form:
	 * key1 --> [item1, item2]
	 * key2 --> [item3]
	 */
	printIndex() {
		console.log('--------------------------')
		console.log('Index Status: ');
		Object.keys(this.index).forEach( (key) => {
			var str = key + " --> ";
			str += this.index[key].map( (i) => {
				return i.metadata.name;
			}).join(', ');
			console.log(str);
		});
		console.log('--------------------------')
	}

	setKeys(keys) {
		this.keys = keys;
		this.rebuild();
	}

	setItems(items) {
		this.items = items;
		this.rebuild();
	}

	addKey(key) {
		this.keys.push(key);
		this.rebuild();
	}

	isIndexed(str) {
		return (typeof this.index[str] !== 'undefined');
	}

	get(str) {
		if (this.isIndexed(str)) {
			return this.index[str];
		} else {
			this.addKey(str);
			return this.index[str];
		}
	}
}

module.exports = RegexItemMap