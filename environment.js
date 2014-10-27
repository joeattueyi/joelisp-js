
    

function Environment(parms, args, outer){
    this.env = {};
    if(outer){
	this.outer = outer;
    }
    if(parms && args){
	this.update(parms, args);
    }
};

Environment.prototype.find = function(v){
    if (this.env[v]){
	return this.env;
    }
    else if(this.outer.env[v]) {
	return this.outer.find(v);
    } else {
	console.log(this.env);
	throw new Error("Error while trying to find environment");
    }
};

Environment.prototype.update =  function(arr1, arr2){
    //2 arrays, add arr1[0] arr2[0] to env as key value pairs
    var shortest = arr1.length < arr2.length ? arr1 : arr2;

    for(var i=0; i<shortest.length; i++){
	this.env[arr1[i]] = arr2[i];
    }
}

module.exports.Environment = Environment;
   
    
    
