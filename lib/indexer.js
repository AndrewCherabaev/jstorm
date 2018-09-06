const fs = require('fs');
const {_instanseof} = require('./../helpers/underscore');

class Index {

	constructor(indexname, encoding, format) {
		this.filename = indexname + '_index.json';
		this.encoding = encoding || 'utf-8';
		this.format = format || '';
		this.data = this.readIndex();
	}



	readIndex() {
		if (!fs.existsSync(this.filename)) {
			fs.writeFileSync(this.filename, JSON.stringify({}), this.encoding, (err) => {
				if (err) throw err;
			});
		}
		
		let data = fs.readFileSync(this.filename, {encoding: this.encoding});

		return JSON.parse(data);
	}

	generateIndex(storage){
		if (_instanseof(storage) != 'Store') throw new Error(`Index expected to be built above Store: ${_instanseof(storage)} given`);
	}
}