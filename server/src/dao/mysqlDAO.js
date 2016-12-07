var mysql = require('promise-mysql');
var Promise = require('bluebird');
var MySqlDAO = function(){	
	this.connection;
	this.pool; 
	this.pool = mysql.createPool({
		"host" : "127.0.0.1",
		"port" : "3306",
		"user" : "arachne",
		"password" : "arachne",
		"database" : "platform",
		"connectionLimit": 10
	});
	mySqlDAO = this;
}

MySqlDAO.prototype.constructor = MySqlDAO;
MySqlDAO.prototype.getConnection = function(){
	return this.pool.getConnection().disposer(function(conn){
		mySqlDAO.pool.releaseConnection(conn);
	});
}
MySqlDAO.prototype.select = function(queryStatement){
  return Promise.using(mySqlDAO.getConnection(), function(connection){
  	return connection.query(queryStatement).then(function(rows){
  		return rows;
  	});
  });
}

MySqlDAO.prototype.insert = function(queryStatement, values){
  return Promise.using(mySqlDAO.getConnection(), function(connection){
  	return connection.query(queryStatement, values).then(function(rows){
  		return rows;
  	});
  });

}

MySqlDAO.prototype.update = function(queryStatement, values){
  return Promise.using(mySqlDAO.getConnection(), function(connection){
  	return connection.query(queryStatement, values).then(function(rows){
  		return rows;
  	});
  });
}

MySqlDAO.prototype.delete = function(){

}

MySqlDAO.prototype.isExist = function(){

}

module.exports = MySqlDAO;