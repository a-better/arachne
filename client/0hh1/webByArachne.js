var domain = document.domain;
var port = location.port;
var url = "http://"+domain+":"+port;

var arachne = new Arachne();
arachne.login('kakao');
arachne.game.title = '0hh1';
arachne.game.desc = 'web puzzle game';
arachne.game.image = url+'/0hh1/img/0hh1.JPG';

$('.sendMessage').on('click', function(){
	arachne.sendMessage('kakao');
});

$('.sendScore').on('click', function(){
	var score = $('#scorenr').text();
	arachne.sendScore(score);	
});