var domain = document.domain;
var port = location.port;
var url = "http://"+domain+":"+port;

var arachne = new Arachne();
arachne.login('kakao');
arachne.game.title = 'Flappybird';
arachne.game.desc = 'web arcade game';
arachne.game.image = url+'/flappy/images/flappy.png';
$('.sendMessage').on('click', function(){
	arachne.sendMessage('kakao');
});

$('.sendScore').on('click', function(){
	var score = window.localStorage.getItem("hiscore");
	arachne.sendScore(score);	
});