var Room = require('./room');
var Network = require('./network/network');
//var EventHandler = require('./eventHandler');
var Engine = function(){
	this.room = new Room();
	engine = this;
	this.network = new Network(this);

};

Engine.prototype.constructor = Engine;

Engine.prototype = {
	setRoom : function(id){
		this.room.setId(id);
		this.room.setURL(url + id);
	}
}


module.exports = Engine;