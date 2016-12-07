var domain = document.domain;
var port = location.port;
var url = "http://"+domain+":"+port;

var arachne = new Arachne();
arachne.login('kakao');
arachne.game.title = 'Hextris';
arachne.game.desc = 'web action puzzle game inspired by Tetris';
arachne.game.image = url+'/hextris/images/Hextris.png';

$('.sendMessage').on('click', function(){
	arachne.sendMessage('kakao');
});

$('.sendScore').on('click', function(){
	var score = $('#cScore').text();
	arachne.sendScore(score);	
});