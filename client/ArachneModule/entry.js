var KakaoModule = require('./src/kakao/kakaoModule');
var Game = require('./src/game/game');
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
