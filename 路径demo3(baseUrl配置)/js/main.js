
require.config({
  baseUrl:"js",
  paths:{
	"moduleA" : "moduleA"  
  }
}); 
require(["moduleA"],function(a){
	console.log(a);
}) 


/*
require.config({
  baseUrl:"js/lib",
  paths:{
	"moduleA2" : "moduleA2"  
  }
}); 
require(["moduleA2"],function(a){
	console.log(a);
}) 
*/

/*
require.config({
  baseUrl:"vendor",
  paths:{
	"moduleA3" : "moduleA3"  
  }
}); 
require(["moduleA3"],function(a){
	console.log(a);
}) 
 */