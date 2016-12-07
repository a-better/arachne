//index.html

window.url = 'http://'+document.domain + ':'+location.port + '/';
   Kakao.init('d875beadbeaca371a2a21d629017b4f4');
   var Engine = require('./engine/engine');
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