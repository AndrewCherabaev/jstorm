const _upFirst = function(arg) {
	const first = arg[0];

	return first.toUpperCase() + arg.substring(1);
}

const _typeof = function(arg) {
    return toString.call(arg).match(/^\[object (\w+)\]$/)[1].toLowerCase();
}

const _instanceof = function(arg) {
    try {
        return arg.constructor.name;
    } catch (e) {
        return _pipe(arg, _typeof, _upFirst);
    }
}

const _pipe = function(...args){
	return args.reduce((a, b) => b(a));
}

module.exports = {
	_typeof,
	_instanceof,
	_pipe
}