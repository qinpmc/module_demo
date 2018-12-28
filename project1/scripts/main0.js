require.config({
	baseUrl:"./scripts",
	paths:{
		g2:"g2/export",
		g2config:"g2/exportconfig"
	},
	shim:{
		"g2":{deps:["g2config"]}
	}
})



require(["g2"],function(g2){
	var res1 = window.g2.lang.ClassTable.classA+" : "+window.g2.extension.Convert.convertA;
	console.log(res1);
})