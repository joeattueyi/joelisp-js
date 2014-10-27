
var operators = {}

operators.add = function(){
    return Array.prototype.reduce.call(arguments, function(x, y){
	return x + y;
    }, 0);
}

operators.mul = function(){
    return Array.prototype.reduce.call(arguments, function(x, y){
	return x * y;
    }, 1);
}

operators.sub = function(x,y){
    return x - y;
}

operators.div = function(x,y){
    return x / y;
}

operators.not = function(x, y){
    return x !== y;
}

operators.gt = function(x, y){
    return x > y;
}

operators.lt = function(x, y){
    return x < y;
}

operators.ge = function(x, y){
    return x >= y;
}

operators.le = function(x, y){
    return x <= y;
}

operators.eq = function(x, y){
    return x === y;
}



module.exports.operators = operators
