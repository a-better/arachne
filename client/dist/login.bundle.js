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

	Kakao.init('d875beadbeaca371a2a21d629017b4f4');
	var Engine = __webpack_require__(1);
	var engine = new Engine();
	$(document).ready(function(){
	  $('#kakao-login-btn').trigger('click');
	});

	var domain = document.domain;
	var port = location.port;
	var url = "http://"+domain+":"+port;

	$('#kakao-login-btn').on('click',
	      function(){
	        Kakao.Auth.login({
	         success: function(authObj) {
	      // 로그인 성공시, API를 호출합니다.
	          Kakao.API.request({
	              url: '/v1/user/me',
	              success: function(res) {
	                var parsing_res = JSON.stringify(res);
	                registerUser(parsing_res);
	                //user data rest api send
	                //ajax run when use get, post
	              },
	              fail: function(error) {
	                alert(JSON.stringify(error));
	              }
	            });
	          },
	         fail: function(err) {
	            alert(JSON.stringify(err));
	          }
	        });
	}); 


	var redirect = function(data){
	  var form = document.login_form;
	  form.user_data.value = data;
	  form.messenger.value = 'kakao';
	  alert(document.getElementById('url').value);
	  form.action = document.getElementById('url').value;
	  form.method="post";
	  form.submit();
	}

	var registerUser = function(user_data){
	  var json_data = JSON.parse(user_data);
	  var ID = json_data.id;
	  var NICKNAME = json_data.properties.nickname;
	  var THUMBNAIL_IMAGE = json_data.properties.thumbnail_image;
	  var MESSENGER = 'kakao'
	  var body = {
	    "ID" : ID,
	    "NICKNAME" : NICKNAME,
	    "THUMBNAIL_IMAGE" : THUMBNAIL_IMAGE,
	    "MESSENGER" : 'kakao'
	  }
	  alert(body);

	  $.ajax({
	    url: "http://"+domain+":"+port +'/user',
	    type: 'PUT',
	    datatype : 'json',
	    data: body,
	    success: function(result) {
	      alert(result);
	      redirect(user_data);
	    },
	    error: function (XMLHttpRequest, textStatus, errorThrown) {
	      alert(textStatus);
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