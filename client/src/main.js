//index.html
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
 
 ga('create', 'UA-88779471-1', 'auto');
 ga('send', 'pageview');
window.url = 'http://'+document.domain + ':'+location.port + '/';
   Kakao.init('d875beadbeaca371a2a21d629017b4f4');
   var Engine = require('./engine/engine');
   var engine = new Engine();             
   engine.network.addServer('WEB', 'WEB');
   var button = document.getElementById("kakaoLink");
   var oldRoomId = '';
   var gameInfo;
    $('.gamemodal').on("click", function () {
      engine.room.setGame($(this).data('id'));
      console.log(engine.room.game);
      engine.network.webServers['WEB'].createLink();
      var game = engine.room.game;
      gameInfo = chooseGame(game); 
      pollRoomChange(gameInfo); 
      // $('#addBookDialog').modal('show');
    });

   $('.linkbtn').on('click', function(){   
     var messenger = this.id;
     engine.room.setMessenger(messenger);
     console.log(engine.room.messenger);
     engine.network.webServers['WEB'].createLink();
     pollRoomChange(gameInfo); 
   });


   var pollRoomChange = function(gameInfo){
      setInterval(function(){
        if(engine.room.id != ''){
          if(oldRoomId == ''){
             sendLink(gameInfo);
             oldRoomId = engine.room.id;
          }
          else{
             if(oldRoomId != engine.room.id){
               sendLink(gameInfo);
               oldRoomId = engine.room.id;
             }
          }
        }

      }, 100);
   };

  var sendLink = function(gameInfo){
      var messenger = engine.room.messenger;   
      document.getElementById('link').value = engine.room.url;
      if(gameInfo.type == 'room'){
        if(messenger == 'kakao'){
          sendKakaoLink(gameInfo);
          engine.room.messenger = '';
        }
      }
      else if(gameInfo.type == 'single'){
        redirect();
      }     
  };
  var chooseGame = function(game){
    var gameInfo = {'image' : "", 
      'label' : "",
      'text'  : "",
      'type' : ""
    };
    if(game == 'catchmind'){
       gameInfo.image = 'images/catchmind.jpg';
       gameInfo.label = '캐치마인드';
       gameInfo.text = '캐치마인드';
       gameInfo.type = 'room';
    }
    else if(game == 'mafia'){
       gameInfo.image = 'images/mafia.jpg';
       gameInfo.label = '마피아';
       gameInfo.text = '마피아';
       gameInfo.type = 'room';
    }
    else if(game == '2048'){
       gameInfo.image = 'img/2048b.png';
       gameInfo.label = '2048';
       gameInfo.text = '2048';
       gameInfo.type = 'single';
    }
    else if(game == 'hextris'){
      gameInfo.image = 'images/Hextris.jpg';
      gameInfo.label = 'Hextris';
      gameInfo.text = 'Hextris';
      gameInfo.type = 'single';
    }
    else if(game == 'flappybird'){
      gameInfo.image = 'images/flappy.png';
      gameInfo.label = 'Flappybird';
      gameInfo.text = 'Flappybird';  
      gameInfo.type = 'single';   
    }
    else if(game == '0hh1'){
      gameInfo.image = 'images/0hh1.jpg';
      gameInfo.label = '0hh1';
      gameInfo.text = '0hh1';
      gameInfo.type = 'single';        
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

  var redirect = function(){
    location.href = engine.room.url;
  }
