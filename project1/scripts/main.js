require.config({
	baseUrl:"./scripts",
	paths:{
		other:"other/other1",
		g2:"g2/export",
		g2config:"g2/exportconfig"
	},
	shim:{
		"other":{deps:["g2"]}, 
		"g2":{deps:["g2config"]}
	}
})



require(["other"],function(other){
	
	console.log(other);
})