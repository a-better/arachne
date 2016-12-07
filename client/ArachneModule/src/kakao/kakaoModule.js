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