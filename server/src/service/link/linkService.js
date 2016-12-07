var JsonConfig = require('../../../utils/json_config');
var StringUtils = require('../../../utils/string');
var idGenerator = require('../../../utils/id');
var MySqlDAO = require('../../dao/mySqlDAO');
var Promise = require('promise');
var LinkService = function(){
	linkService = this;
	this.links = {};
	this.timeouts = {};
	this.expireTime = 300;
	mySqlDAO = new MySqlDAO();
	//gameServerInfo = new JsonConfig("server/game_serverinfo.json");
}
LinkService.prototype.constructor = LinkService;
LinkService.prototype = {
	addLink : function(key, link){
		linkService.links[key] = link;
	},
	removeLink : function(key){
		
		delete linkService.links[key];
	},
	createLink : function(data){
		var url;
		var key;
		var ip;
		var port;
		var roomId;
		//ip = gameServerInfo.jsonContent[data.game]["ip"];
		//port = gameServerInfo.jsonContent[data.game]["port"];
		console.log(data.game);
		return linkService.searchGame(data.game).then(function(result){
			if(result[0].GAME_TYPE == "ROOM"){
				ip = result[0].GAME_IP;
				port = result[0].GAME_PORT;
				id = idGenerator();
				url = "http://" + ip + ":" + port + "/" + id;
			}
			else if(result[0].GAME_TYPE == "SINGLE"){
				url = result[0].GAME_URL;
			}
			key = url.hashCode();
			linkService.links[key] = {"URL": url, "GAME_TYPE" : result[0].GAME_TYPE};
			linkService.timeouts[key] = setTimeout(function(){linkService.removeLink(key), delete linkService.timeouts[key]}, 1000 * linkService.expireTime);
			console.log(linkService.links);
			return key;
		});

	},
	getLink : function(key){
		return linkService.links[key];
	},
	checkLink : function(key){
		if(linkService.links[key]){
			return true;
		}
		else{
			return false;
		}
	},
	checkTimeout : function(key){
		if(linkService.timeouts[key]){
			return true;
		}
		else{
			return false;
		}
	},
	searchGame : function(title){
		var query = 'select * from GAME where TITLE = ' + "'" + title  + "'";
		return mySqlDAO.select(query); 
	}
}

module.exports = LinkService;