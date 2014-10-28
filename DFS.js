
module.exports.dfs = function(al){
    
    var parent = {};
    var order = [];

    var DFS_Visit = function(al, s){
	for (var i=0; i<al[s].length; i++){
            //console.log(al[s][i]);
            if(!parent[al[s][i]]){
		parent[al[s][i]] = s;
		DFS_Visit(al, al[s][i]);
		order.push(al[s][i]);
            }
	}
    }

    var DFS = function(al){
	//var parent = {};
	for (var v in al){
            
            if(!parent[v]){
		parent[v] = null;
		DFS_Visit(al, v);
		order.push(v);
            }
	}
	
    }
    DFS(al);
    return {"independency": parent, "order": order};
};

var al = {
    "g": ["h"],
    "a": ["h", "b"],
    "b": ["c"],
    "c": ["f"],
    "d": ["c", "e"],
    "e": ["f"],
    "h": [],
    "f": [],
    "i": []
};


