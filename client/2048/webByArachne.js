var domain = document.domain;
var port = location.port;
var url = "http://"+domain+":"+port;

var arachne = new Arachne();
arachne.login('kakao');
arachne.game.title = '2048';
arachne.game.desc = 'web puzzle game';
arachne.game.image = url+'/2048/images/2048.jpg';

$('.sendMessage').on('click', function(){

	arachne.sendMessage('kakao');
});

$('.sendScore').on('click', function(){
	var score = $('.score-container').text();
	var plusPos = score.indexOf("+");
	var score = score.substring(0, plusPos);
	arachne.sendScore(score);	
});