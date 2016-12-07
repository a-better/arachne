var MySqlDAO = require('../../dao/mySqlDAO');
var Promise = require('promise');
var GameService = function(){
	mySqlDAO = new MySqlDAO();

}

GameService.prototype.constructor = GameService;
GameService.prototype.register = function(values){
	var query = 'insert into GAME set ?'
	return mySqlDAO.insert(query,values);
}

GameService.prototype.searchByTitle = function(values){
  	var query = "select * from GAME where TITLE =" + "'"+ values.TITLE + "'";
  	return mySqlDAO.select(query);
}


module.exports = GameService;