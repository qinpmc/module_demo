

/*
require(["moduleA"],function(a){
	console.log(a);
}) */


require.config({
  paths:{
	"moduleA2" : "lib/moduleA2"  
  }
}); 
require(["moduleA2"],function(a){
	console.log(a);
}) 
/*
require.config({
  paths:{
	"moduleA3" : "../vendor/moduleA3"  
  }
}); 
require(["moduleA3"],function(a){
	console.log(a);
})*/