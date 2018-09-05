var util = require('util');
var {DataBase} = require('./lib/database');

var database = new DataBase('storage', [
	'users'
]);

var users = database.get('users');

users.save({id: 1, name: 'username'})
	 .save({id: 2, name: 'not username'})
	 .save({id: 3, name: 'also username'});

console.log(users.find({id: 2, name: 'not username'}));
console.log(users.find(1));
console.log(users.findFirst(1));

database.drop();