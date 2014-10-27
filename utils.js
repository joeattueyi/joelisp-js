

var utils = {};
utils.zip  = function () {
    var args = [].slice.call(arguments);
    var shortest = args.length==0 ? [] : args.reduce(function(a,b){
        return a.length<b.length ? a : b
    });

    return shortest.map(function(_,i){
        return args.map(function(array){return array[i]})
    });
}

utils.extend = function(){
    var args = Array.prototype.slice.call(arguments);
    var obj = args[0];
    var newProps = args[1]
    for (var prop in newProps){
	obj[prop] = newProps[prop];
    }
    return obj;
}


module.exports.utils = utils
