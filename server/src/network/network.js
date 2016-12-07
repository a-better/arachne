var Promise = require('promise');
var Network = function(engine){
	network = this;
	this.engine = engine;
};

Network.prototype.Constructor = Network;

Network.prototype = {
	setConnection : function(server){
		io = require("socket.io").listen(server);
	},
	setEventHandlers: function(){
		io.on("connection", function(client) {
			console.log('connected !'+ ':'+ client.id);
			client.on("create link", network.onCreateLink);
		});
	},
	onCreateLink : function(data){
		var socket = this;
		network.engine.linkService.createLink(data).then(function(result){
			console.log('network line 21 : ' + result);
			io.to(socket.id).emit("receive link", {id : result});
		});
		
	}
};

module.exports = Network;