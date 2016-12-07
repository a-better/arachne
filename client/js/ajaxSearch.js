var domain = document.domain;
var port = location.port;
var url = "http://"+domain+":"+port;
 $(function(){

    $("#gameDropdown").on('click', 'li a', function(){
      $("#gameDropdownBtn:first-child").text($(this).text());
      $("#gameDropdownBtn:first-child").val($(this).text());
   });

    $("#messengerDropdown").on('click', 'li a', function(){
      $("#messengerDropdownBtn:first-child").text($(this).text());
      $("#messengerDropdownBtn:first-child").val($(this).text());
   });

    $("#userNameInput").keydown(function (key) {
 		var data = {};
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
            data["NICKNAME"] = $("#userNameInput").val();
            if($("#messengerDropdownBtn:first-child").val() != ''){
            	console.log($("#messengerDropdownBtn:first-child").val());
            	data["MESSENGER"] = $("#messengerDropdownBtn:first-child").val();
            }
            if($("#gameDropdownBtn:first-child").val() != ''){
            	console.log($("#gameDropdownBtn:first-child").val());
            	data["GAME_TITLE"] = $("#gameDropdownBtn:first-child").val()
            }
            ajaxSearchRanking(data);        
        }
 
    });
});

 var ajaxSearchRanking = function(data){
 	var query = '?';
 	var i=0;
 	for(key in data){
 		query += key  + '=' + data[key];
 		i++;
 		if(Object.keys(data).length > i){
 			query += '&';
 		}
 	}
 	console.log(query);
    $.ajax({
      url: "http://"+domain+":"+port +'/rank/' + query,
      type: 'GET',
      success: function(result) {
      	console.log(result);
      	$('#rankingTableBody').empty();
      	for(var i=0; i<result.length; i++){
      		$('#rankingTableBody').append('<tr>'
      				+'<td>' + result[i].RANKING + '</td>'
      				+'<td>' + result[i].NICKNAME + '</td>'
      				+'<td>' + result[i].MESSENGER + '</td>'
      				+'<td>' + result[i].TITLE + '</td>'
      			+'</tr>'
      			)
      	}
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus);
      }
    });

 }