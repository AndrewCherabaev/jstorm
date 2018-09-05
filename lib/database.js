var fs = require('fs');
var Store = require('./store');

class DataBase {
	constructor(basename, storages) {
		this.basename = './' + (basename.length ? basename : '');
		this._storages = {};

		if (this.basename.length > 2 && !fs.existsSync(this.basename)){
    		fs.mkdirSync(this.basename);
		}

		if (storages.length) {
			for(let i=0; i<storages.length; i++) {
				let storeObject;
				
				if (this.basename.length == 2) {
					storeObject = new Store(this.basename + storages[i])
				} else {
					storeObject = new Store(this.basename + '/' + storages[i])
				}

				this._storages[storages[i]] = storeObject;
			};	
		}
	}

	get(tablename){
		return this._storages[tablename];
	}

	all(){
		return this._storages;
	}

	drop(){}

	dropTable(tablename){
		this.get(tablename).drop()
	}
}

module.exports = DataBase;