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

	var KakaoModule = __webpack_require__(1);
	var Game = __webpack_require__(2);
	var domain = document.domain;
	var port = location.port;
	var url = "http://"+domain+":"+port;

	window.Arachne = function(){
		this.kakaoModule = new KakaoModule(this);
		this.game = new Game();
		arachne = this;
	}
	Arachne.prototype.constructor = Arachne;
	Arachne.prototype = {
		login : function(messenger){
			if(messenger == 'kakao'){
				this.kakaoModule.setScript();
				this.kakaoModule.login();
			}
		},
		sendMessage : function(messenger){
			if(messenger == 'kakao'){
				 $.ajax({
	    		  url: "http://"+domain+":"+port +'/link/' + arachne.game.title,
	    		  type: 'GET',
	    		  datatype : 'json',
	    		  success: function(result) {	    
	    		    var url = "http://"+domain+":"+port +'/'+result;
	    		    arachne.kakaoModule.sendKakaoLink(url, arachne.game.desc);
	    		  },
	    		  error: function (XMLHttpRequest, textStatus, errorThrown) {
	    		    alert(textStatus);
	    		  }
	    		});
				
			}
		},
		sendScore : function(score){
			var body = {
				"ID" : arachne.kakaoModule.ID,
				"MESSENGER" : arachne.kakaoModule.MESSENGER,
				"SCORE" : score
			};
			$.ajax({
	    	  url: "http://"+domain+":"+port +'/rank/' + arachne.game.title,
	    	  type: 'PUT',
	    	  datatype : 'json',
	    	  data : body,
	    	  success: function(result) {	    
	    	  	if(result == 'OK'){
	    	  		alert('점수 저장이 완료 되었습니다.');
	    	  	}
	    	  },
	    	  error: function (XMLHttpRequest, textStatus, errorThrown) {
	    	    alert(textStatus);
	    	  }
	    	});
		}
	}

	module.exports = Arachne;


/***/ },
/* 1 */
/***/ function(module, exports) {

	var KakaoModule = function(arachne){
		this.kakaoScript;
		this.kakao;

	  this.ID;
	  this.NICKNAME;
	  this.THUMBNAIL_IMAGE;
	  this.MESSENGER = 'kakao';
	  this.arachne = arachne;
	  kakaoModule = this;
	}

	KakaoModule.prototype.constructor = KakaoModule;

	KakaoModule.prototype = {
		setScript : function(){
	  		var firstScript = document.getElementsByTagName('script')[0];
	  		this.kakaoScript = document.createElement('script');
	  		this.kakaoScript.src = '//developers.kakao.com/sdk/js/kakao.min.js';
	  		firstScript.parentNode.insertBefore(this.kakaoScript, firstScript);
	  		console.log(kakaoModule.kakaoScript);
		},
		login : function(){
	  		this.kakaoScript.onload = function () {
	  			Kakao.init('d875beadbeaca371a2a21d629017b4f4');
	      Kakao.Auth.login({
	       success: function(authObj) {
	       //로그인 성공시, API를 호출합니다.
	        Kakao.API.request({
	            url: '/v1/user/me',
	            success: function(res) {
	              var parsing_res = JSON.stringify(res);
	              kakaoModule.registerUser(parsing_res);
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
	  		};      

		},
		sendKakaoLink : function(url, text){
	  	Kakao.Link.sendTalkLink({
	        label: kakaoModule.arachne.game.title,
	        image: {
	          src: kakaoModule.arachne.game.image,
	          width: '300',
	          height: '200'
	        },
	        webButton: {
	          text: text,
	          url:  url// 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
	        }
	      }); 	
		},
	  registerUser : function(user_data){
	    var domain = document.domain;
	    var port = location.port;
	    var url = "http://"+domain+":"+port;
	    var json_data = JSON.parse(user_data);
	    kakaoModule.ID = json_data.id;
	    kakaoModule.NICKNAME = json_data.properties.nickname;
	    kakaoModule.THUMBNAIL_IMAGE = json_data.properties.thumbnail_image;
	    kakaoModule.MESSENGER = 'kakao';
	    var body = {
	      "ID" : kakaoModule.ID,
	      "NICKNAME" : kakaoModule.NICKNAME,
	      "THUMBNAIL_IMAGE" : kakaoModule.THUMBNAIL_IMAGE,
	      "MESSENGER" : kakaoModule.MESSENGER
	    }
	  
	    $.ajax({
	      url: "http://"+domain+":"+port +'/user',
	      type: 'PUT',
	      datatype : 'json',
	      data: body,
	      success: function(result) {
	      },
	      error: function (XMLHttpRequest, textStatus, errorThrown) {
	        alert(textStatus);
	      }
	    });
	  }

	}

	module.exports = KakaoModule;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var Game = function(){
		this.title = '';
		this.desc = '';
		this.image = '';
		this.roomKey = '';
	}

	Game.prototype.constructor = Game;

	module.exports = Game;



/***/ }
/******/ ]);