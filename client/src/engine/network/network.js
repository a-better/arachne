var WebServer = require('./web/web_server');
var Network = function(engineObj){
	network = this;
	this.engine = engineObj;
	this.webServers = {};
};

Network.prototype.Constructor = Network;

Network.prototype = {
	addServer : function(server, key){
		if(server == 'WEB'){
			//console.log(network.engine);
			webServer = new WebServer(key, network.engine);
		}
		this.webServers[key] = webServer;
	}
};

module.exports = Network;