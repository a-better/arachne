var Promise = require('promise');
var GameService = require('../service/game/gameService');
var UserService = require('../service/user/userService');
var RankService = require('../service/rank/rankService');
var LinkService = require('../service/link/linkService');
var Rest = function(application, linkService){
	app = application;
	this.gameService = new GameService();
	this.userService = new UserService();
	this.rankService = new RankService();
	this.linkService = linkService;

	rest = this;
}

Rest.prototype.constructor = Rest;

Rest.prototype = {
	setRESTAPI : function(){
		this.setLinkAPI();
		this.setUserAPI();
		this.setGameRegisterAPI();
		this.setRankAPI();
	},
	setUserAPI : function(){
		app.put('/user', function(req, res){
			var body = req.body;
			rest.userService.search(body).then(function(result){
				if(result.length == 0){
					return rest.userService.create(body);
				}
				else{
					return rest.userService.update(body);
				}
			}).then(function(result){
				res.send(200);
			},function(err){
				console.log('error in saving user ' + err);
				res.send(400);
			});
		});
	},
	setGameRegisterAPI : function(){
		app.post('/game', function(req, res){
			var body = req.body;
			rest.gameService.searchByTitle(body).then(function(result){
				console.log(result.length);
				if(result.length > 0){
					throw res.send(403);
				}
				else{
					return rest.gameService.register(body);
				}
				
			}).then(function(result){
				res.send(200);
			}, function(err){
				console.log('error in insert' + err);
				res.send(400);
			});				
		});
	},
	setRankAPI : function(){
		app.get('/rank/', function(req, res){
			var data = {};
			var GAME_SEQID;
			var USER_SEQID;
			if(req.query.NICKNAME){
				console.log('1' + req.query.NICKNAME);
				data["NICKNAME"] = req.query.NICKNAME;
			}
			if(req.query.GAME_TITLE){
				data["TITLE"] = req.query.GAME_TITLE;
			}
			if(req.query.MESSENGER){
				data["MESSENGER"] = req.query.MESSENGER;
			}

			if(data["TITLE"]){
				rest.gameService.searchByTitle(data).then(function(result){
					GAME_SEQID = result[0].SEQ_ID;
					return rest.rankService.search(GAME_SEQID);
				}).then(function(result){
					var messengerNicknameResult = [];
					var nicknameResult = [];
					var messengerResult = [];
					for(var i=0; i<result.length; i++){
						result[i].RANKING = i+1;
						if(data["MESSENGER"] && data["MESSENGER"] == result[i].MESSENGER){
							messengerResult.push(result[i]);
							if(data["NICKNAME"] && data["NICKNAME"] == result[i].NICKNAME){
								messengerNicnameResult.push(result[i]);
							}
						}
						else{
							if(data["NICKNAME"] && data["NICKNAME"] == result[i].NICKNAME){
								nicknameResult.push(result[i]);
							}
						}
					}
					console.log(result);
					if(data["MESSENGER"]){
						if(data["NICKNAME"]){
							console.log('1' + result);
							res.send(messengerNicknameResult);
						}
						else{
							console.log('2' + result);
							res.send(messengerResult);
						}
					}
					else{
						if(data["NICKNAME"]){
							console.log( '3' + data["NICKNAME"]);
							res.send(nicknameResult);
						}
						else{
							console.log('4' + result);
							res.send(result);
						}
					}
					
				})
			}
		});
		app.put('/rank/:game', function(req, res){
			var gameTitle = req.params.game;
			var body = req.body;
			body["TITLE"] = gameTitle;
			var userId = body.ID;
			var messenger = body.MESSENGER;
			var Score = req.body.SCORE;
			delete req.body["SCORE"];
			var USER_SEQID;
			var GAME_SEQID;

			rest.gameService.searchByTitle(body).then(function(result){

				GAME_SEQID = result[0].SEQ_ID; 
				console.log(GAME_SEQID);
				return rest.userService.search(req.body);
			}).then(function(result){
				USER_SEQID = result[0].SEQ_ID;
				console.log(USER_SEQID);
				return rest.rankService.search(GAME_SEQID, USER_SEQID);
			}).then(function(result){
				console.log(result);
				if(result.length == 0){
					return rest.rankService.create(USER_SEQID, GAME_SEQID, Score);
				}
				else{
					return rest.rankService.update(USER_SEQID, GAME_SEQID, Score);
				}
			}).then(function(result){
				res.send(200);
			}, function(error){
				console.log('error in saving score' + error);
				throw res.send(400); 
			});

		});
	},
	setLinkAPI : function(){
		//create Link REST API
		app.get('/link/:game', function(req, res){
			var game = req.params.game;
			var data = {
				"game" : game
			};
			rest.linkService.createLink(data).then(function(result){
				res.send(result + '');
			});
		});
		app.put('/link/:id', function(req, res){
			var id = req.params.id;
			if(rest.linkService.checkLink(id)){
				if(rest.linkService.checkTimeout(id)){
					delete rest.linkService.timeouts[id];
				}
			}
		});
		app.delete('/link/:id', function(req, res){
			var id = req.params.id;
			if(rest.linkService.checkLink(id)){
				rest.linkService.removeLink(id);
				if(rest.linkService.checkTimeout(id))
				{
					delete rest.linkService.timeouts[id];
				}
			}
		});
	}
}

module.exports = Rest;