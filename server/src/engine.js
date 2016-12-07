var Network = require('./network/network');
var LinkService = require('./service/link/linkService');
var Engine = function(){
	this.network = new Network(this);
	this.linkService = new LinkService();
	engine = this;
};

Engine.prototype.constructor = Engine;

Engine.prototype = {
};

module.exports = Engine;