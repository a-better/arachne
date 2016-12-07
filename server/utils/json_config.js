var fs = require("fs");
var JsonConfig = function(fileName){
	contents = fs.readFileSync(fileName);
	this.jsonContent = JSON.parse(contents);
}

JsonConfig.prototype.constructor = JsonConfig;
JsonConfig.prototype = {
}

module.exports = JsonConfig;