const DataBase = require('./lib/database');
const Store = require('./lib/store');
const {_instanceof, _typeof, _pipe} = require('./helpers/underscore');

module.exports = {
	DataBase,
	Store
};

const database = new DataBase('storage', [
	'users'
]).useIndexes();

const users = database.get('users');

users.save({id: 1, name: 'username'})
	 .save({id: 2, name: 'not username'})
	 .save({id: 3, name: 'also username'});

console.log(users.find({id: 2, name: 'not username'}));
console.log(users.find(1));
console.log(users.findFirst(1));
console.log(_instanceof(null), _typeof(null));

// users.drop() == database.dropTable('users');