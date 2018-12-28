define(function(){
	console.log("main");
	document.onclick = function(){
		require(["./vendor/moduleB"],function(b){
			b.test();
		});
	}
});

