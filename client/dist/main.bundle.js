/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//index.html

	window.url = 'http://'+document.domain + ':'+location.port + '/';
	   Kakao.init('d875beadbeaca371a2a21d629017b4f4');
	   var Engine = __webpack_require__(1);
	   var engine = new Engine();             
	   engine.network.addServer('WEB', 'WEB');
	   var button = document.getElementById("kakaoLink");
	   var oldRoomId = '';
	    $('.gamemodal').on("click", function () {
	      engine.room.setGame($(this).data('id'));
	      console.log(engine.room.game);
	      // $('#addBookDialog').modal('show');
	    });

	   $('.linkbtn').on('click', function(){   
	     var messenger = this.id;
	     engine.room.setMessenger(messenger);
	     console.log(engine.room.messenger);
	     engine.network.webServers['WEB'].createLink();
	     pollRoomChange(); 
	   });


	   var pollRoomChange = function(){
	      setInterval(function(){
	        if(engine.room.id != ''){
	          if(oldRoomId == ''){
	             sendLink();
	             oldRoomId = engine.room.id;
	          }
	          else{
	             if(oldRoomId != engine.room.id){
	               sendLink();
	               oldRoomId = engine.room.id;
	             }
	          }
	        }

	      }, 100);
	   };

	  var sendLink = function(){
	      var game = engine.room.game;
	      var messenger = engine.room.messenger;
	      var gameInfo = chooseGame(game); 
	      document.getElementById('link').value = engine.room.url;
	      if(messenger == 'kakao'){
	        sendKakaoLink(gameInfo);
	      }     
	  };
	  var chooseGame = function(game){
	    var gameInfo = {'image' : "", 
	      'label' : "",
	      'text'  : ""
	    };
	    if(game == 'catchmind'){
	       gameInfo.image = 'images/catchmind.jpg';
	       gameInfo.label = '캐치마인드';
	       gameInfo.text = '캐치마인드'
	    }
	    else if(game == 'mafia'){
	       gameInfo.image = 'images/mafia.jpg';
	       gameInfo.label = '마피아';
	       gameInfo.text = '마피아'
	    }
	    else if(game == '2048'){
	       gameInfo.image = 'img/2048b.png';
	       gameInfo.label = '2048';
	       gameInfo.text = '2048'
	    }
	    else if(game == 'Hetrix'){
	      gameInfo.image = 'images/Hextris.jpg';
	      gameInfo.label = 'Hextris';
	      gameInfo.text = 'Hextris';
	    }
	    return gameInfo;
	  }
	  var sendKakaoLink  = function (gameInfo){
	      Kakao.Link.sendTalkLink({
	          label: gameInfo.label,
	          image: {
	            src: url + gameInfo.image,
	            width: '300',
	            height: '200'
	          },
	          webButton: {
	            text: gameInfo.text,
	            url:  engine.room.url// 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
	          }
	        }); 
	   }

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Room = __webpack_require__(2);
	var Network = __webpack_require__(3);
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

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var WebServer = __webpack_require__(4);
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

/***/ },
/* 4 */
/***/ function(module, exports) {

	
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

/***/ }
/******/ ]);