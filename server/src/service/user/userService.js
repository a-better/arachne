var MySqlDAO = require('../../dao/mySqlDAO');
var Promise = require('promise');
var UserService = function(){
	mySqlDAO = new MySqlDAO();
}

UserService.prototype.constructor = UserService;
UserService.prototype.search = function(values){
	var query = 'select * from USER where ID = ' 
				+ "'" + values.ID + "'" 
				+ ' AND MESSENGER = ' 
				+ "'" + values.MESSENGER + "'"; 
	return mySqlDAO.select(query);			
}
UserService.prototype.create = function(values){
	var query = 'insert into USER set ?'
	console.log(values);
	return mySqlDAO.insert(query, values);
}
UserService.prototype.update = function(values){
	var query = 'update USER set ? where ID = ' 
				+ "'" + values.ID + "'" 
				+ ' AND MESSENGER = ' 
				+ "'" + values.MESSENGER + "'"; 
	return mySqlDAO.update(query, values);
}


module.exports = UserService;