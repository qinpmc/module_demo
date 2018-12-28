window.g2 = window.g2||{};
window.g2.lang = {
	ClassTable:null
}
window.g2.extension = {
	Convert:null
}
define(["classtable","convert"],function(classtable,convert){
	
		window.g2.lang.ClassTable = classtable;
		window.g2.extension.Convert = convert;
	
})