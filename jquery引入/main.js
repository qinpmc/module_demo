
/*
require(["./vendor/jquery-3.3.1.min","moduleA"],function($,a1){
	// callback function
	$(function(){
		alert("load finished");
		console.log(a1);
	})
});*/


require.config({
    paths : {
        "jquery" : "./vendor/jquery-1.12.1.min"   
    }
})
require(["jquery","moduleA"],function($,a){
    $(function(){
        console.log("load finished"); 
        console.log(a);		
    })
})