const fs = require('fs');
const Store = require('./store');
const Index = require('./indexer');
const { _instanceof } = require('./../helpers/underscore');

class DataBase {
	constructor(basename, storages) {
		this.basename = './' + (basename.length ? basename : '');
		this._storages = {};

		if (this.basename.length > 2 && !fs.existsSync(this.basename)){
    		fs.mkdirSync(this.basename);
		}

		if (storages.length) {
			for(let storage of storages) {
				let storeObject;
				
				if (this.basename.length == 2) {
					storeObject = new Store(this.basename + storage)
				} else {
					storeObject = new Store(this.basename + '/' + storage)
				}

				this._storages[storage] = storeObject;
			};	
		}
	}

	get(tablename){
		return this._storages[tablename];
	}

	all(){
		return this._storages;
	}

	useIndexes(indexnames){
		let indexes = indexnames || Object.keys(this._storages);
		for (let index of indexes) {
			console.log(index + '_index.json');
		}
		return this;
	}

	drop(){
		for (let key in this._storages) {
			let storage = this._storages[key];
			if (_instanceof(storage) == 'Store'){
				storage.drop();
			}
		}
		if (this.basename.length > 2) {
			fs.rmdirSync(this.basename);
		}
	}

	dropTable(tablename){
		return this.get(tablename).drop();
	}
}

module.exports = DataBase;