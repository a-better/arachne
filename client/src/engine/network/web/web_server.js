
var WebServer = function(key, engineObj){
	webServer = this;
	this.engine = engineObj;
	this.key = key;
	this.socket = '';
	this.setConnection();
};

WebServer.prototype.Constructor = WebServer;

WebServer.prototype = {
	setConnection :function(){
		var domain = document.domain;
		var port = location.port;
		var url = "http://"+domain+":"+port;
		//console.log(webServer.engine);
		this.socket = io(url);
		this.setEventHandlers();
	},
	setEventHandlers : function(){
		this.socket.on('receive link', this.onReceiveLink);
	},
	createLink : function(){
		this.socket.emit('create link', {game : engine.room.game});
	},
	onReceiveLink : function(data){
		console.log(data);
		webServer.engine.setRoom(data.id);
	}
};

module.exports = WebServer;