var Room = function(){
	this.id = '';
	this.url= '';
	this.messenger = '';
	this.game = '';
	//this.players = [];
};

Room.prototype.constructor = Room;

Room.prototype = {
	setId : function(roomId){
		this.id = roomId;
	},
	setMessenger : function(messenger){
		this.messenger = messenger
	},
	setURL : function(url){
		this.url = url;
	},
	setGame : function(game){
		this.game = game;
	}
};

module.exports = Room;