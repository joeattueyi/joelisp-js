var mori = require("mori");

var std = {};

std.count = function(coll){
    return mori.count(coll);
}

std.conj = function(){
    return mori.conj(arguments[0], Array.prototype.slice.call(arguments, 1));
}

std.cons = function(val, coll){
    return mori.cons(val, coll);
}

std.first = function(coll){
    return mori.first(coll);
}


std.rest = function(coll){
    return mori.rest(coll);
}

std.list = function(){
    return mori.list.apply(null, arguments);
}

std.islist = function(coll){
    return mori.is_list(coll);
}

std.vector = function(){
    return mori.vector.apply(null, arguments);
}

std.isvector = function(coll){
    return mori.is_vector(coll);
}

std.hashmap = function(){
    return mori.hash_map.apply(null, arguments);
}

std.ishashmap = function(coll){
    return mori.is_map(coll);
}

std.set = function(seq){
    return mori.set(seq);
}

std.isset = function(coll){
    return mori.is_set(coll);
}

std.sortedset = function(){
    return mori.sorted_set.apply(null, arguments);
}


exports.std = std;

