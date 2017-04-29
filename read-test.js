var fs = require("fs");

fs.readFile("commands.txt", "utf8", function(error, data){

	if(error){
		console.log("THERE WAS AN ERROR: " + error);
	}

	console.log(data);

	var dataArr = data.split(",");

	console.log(dataArr);
	console.log(dataArr[0]);
	console.log(dataArr[1]);
})