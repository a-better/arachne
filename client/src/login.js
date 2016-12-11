(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-88779471-1', 'auto');
ga('send', 'pageview');
Kakao.init('d875beadbeaca371a2a21d629017b4f4');
var Engine = require('./engine/engine');
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

  $.ajax({
    url: "http://"+domain+":"+port +'/user',
    type: 'PUT',
    datatype : 'json',
    data: body,
    success: function(result) {
      redirect(user_data);
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert(textStatus);
    }
  });
}