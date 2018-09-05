const _typeof = function(arg) {
    return toString.call(arg).match(/^\[object (\w+)\]$/)[1].toLowerCase();
}

const _instanceof = function(arg) {
    try {
        return arg.constructor.name;
    } catch (e) {
        return "Undefined";
    }
}

module.exports = {
	_typeof,
	_instanceof
}