var std = require('./std.js').std;
var op = require('./operators.js').operators;
var Environment = require('./environment.js').Environment;
var utils = require('./utils.js').utils;


var addGlobals = function(env){

    utils.extend(env.env, {
	'+': op.add, '-': op.sub, '*': op.mul, '/': op.div, 'not': op.not,
	'>': op.gt, '<': op.lt, '>=': op.ge, '<=': op.le, '=': op.eq,
	'count': std.count, 'conj': std.conj, 'cons': std.cons, 'first': std.first,
	'rest': std.rest, 'list': std.list, 'list?': std.islist, 'vector': std.vector,
	'vector?': std.isvector, 'hash-map': std.hashmap, 'map?': std.ishashmap,
	'set': std.set, 'set?': std.isset, 'sorted-set': std.sortedset
    });

    return env;
}

var globalEnv = addGlobals(new Environment());

//Evaluate expressions
var eval = function(expr, env){
    if(typeof expr === 'string') return env.find(expr)[expr];

    else if(Object.prototype.toString.call(expr) !== '[object Array]'){
	return expr;
    }

    else if(expr[0] === 'quote'){
	return expr[1];
    }
    else if(expr[0] === 'if'){
	var test = expr[1];
	var conseq = expr[2];
	var alt = expr[3];
	if(eval(test, env)){
	    return eval(conseq, env);
	}else {
	    return eval(alt, env);
	}
    }

    else if(expr[0] === 'def'){
	var _var = expr[1];
	var exp = expr[2];
	env.env[_var] = eval(exp, env);
    }

    else if(expr[0] === 'fn'){
	//fn [args] expr
	//fn [a b] (* a b)
	//function(a,b){return a*b}
	var _vars = expr[1];
	var exp = expr[2];
	return function(){
	    return eval(exp, new Environment(_vars, Array.prototype.slice.call(arguments), env));
	}
    }

    else if(expr[0] === 'do'){
	for(var i=1; i<expr.length; i++){
	    var _val = eval(expr[i], env);
	}
	return _val
    }

    else if(expr[0] === 'let'){
	//(let [x exp] exp)

	var bindings = expr[1];
	var body = expr[2];
	if(bindings.length % 2 !== 0) throw new Error("Bindings are not Even");

	var newEnv = new Environment(null,null,env);
	
	for(var i=0; i<bindings.length; i+=2){
	    newEnv.env[bindings[i]] = eval(bindings[i+1], newEnv);
	}
	return eval(body, newEnv);
    }
    else {
	var expressions = expr.map(function(e){
	    return eval(e, env);
	});
	var proc = expressions.shift();
	//console.log(proc.toString());
	//console.log(expressions);
	return proc.apply(null, expressions);
    }

}



//PARSING

var tokenise = function(str){
    var re = /\(|\)|\[|\]/g;
    return str.replace(re, " $& ").match(/\S+/g);
}


var atom = function(token){
    if (token === ""){
    }
    else if (token < Number.MAX_VALUE){
	return (+token);
    }
    else {
	return String(token);
    }
  
}   
var readFromTokens = function(tokens){
    if(tokens.length === 0) throw new Error("unexpected EOF while reading")

    var token = tokens.shift();

    if (token === '('){
	var L = [];
	while(tokens[0] !== ')'){
	    L.push(readFromTokens(tokens))
	}
	tokens.shift();
	return L;
    }
    else if (token == ')'){
	throw new Error("Unexpected )")
    }

    else if (token === '['){
	var L = [];
	while(tokens[0] !== ']'){
	    L.push(readFromTokens(tokens))
	}
	tokens.shift();
	return L;
    }

    else if (token === ']'){
	throw new Error("Unexpected ]");
    }
    
    else{
	return atom(token);
    }
}

var read = function(s){
    return readFromTokens(tokenise(s));
}


 
var repl = function(){
    process.stdout.write(" 8===D~~  ");

    process.stdin.on('data', function(text){
	var s = String(text);
	//console.log(String(text).split(" "));
	//console.log(eval(read(s), globalEnv));
	//console.log(tokenise(s));
//	console.log(read(s));
	console.log(eval(read(s), globalEnv))
    
	if(text === 'quit\n') {
	    process.exit();
	}
    });
}

repl();
