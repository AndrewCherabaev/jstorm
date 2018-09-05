const fs = require('fs');
const { _typeof } = require('./../helpers/typeof');

class Store {
	constructor(tablename, encoding, format) {
		this.filename = tablename + '.json';
		this.encoding = encoding || 'utf-8';
		this.format = format || ' ';
		this.data = this.readTable();
	}

	save(object){
		this.data.push(object);

		fs.writeFileSync(this.filename, JSON.stringify(this.data, null, this.format), this.encoding, (err, data) => {
			if (err) throw err;
		})

		return this;
	}

	readTable() {
		if (!fs.existsSync(this.filename)) {
			fs.writeFileSync(this.filename, JSON.stringify([]), this.encoding, (err) => {
				if (err) throw err;
			});
		}
		
		let data = fs.readFileSync(this.filename, {encoding: this.encoding});

		return JSON.parse(data);
	}

	find(query) {
		let keys = [],
			values = [], 
			q_length = 0,
			result = this.data;
		if (_typeof(query) == 'number') {
			keys.push('id');
			values.push(query);
			q_length = 1;
		} else if (_typeof(query) == 'object') {
			Object.keys(query).forEach((key) => {
				keys.push(key);
				values.push(query[key]);
				q_length++;
			});
		}

		for (let i=0; i<q_length; i++) {
			result = result.filter((item) => {
				let key = keys[i];
				return item[key] == values[i];
			})
		}

		return result;
	}

	findFirst(query) {
		return this.find(query)[0];
	}

	drop(){}
}

module.exports = Store;