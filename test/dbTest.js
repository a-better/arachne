var MySqlConnector = require('../server/db/mySqlConnector');
var Promise = require('promise');
var expect    = require("chai").expect;
describe("Test DB", function() {
	this.timeout(3000);
	describe("Access DB", function(){
		var mySqlConnector;
		var connection;
		var rows;
		it("access to aws instance db", function(done){
			mySqlConnector = new MySqlConnector();	
			setTimeout(function(){		
				done();
			}, 500)
		});
		it("get game table", function(){
			var select = Promise.denodeify(mySqlConnector.select);
			
			console.log(connection);
			rows = select('select * from GAME').then(function(result){
				console.log(result);
				return result;
			});
		});
		it("insert into game table", function(){
			var GAME = {
				"TITLE" : "MAFIA" 
			}
			var query = 'insert into GAME set ?'
			var insert = Promise.denodeify(mySqlConnector.insert);
			rows = insert(query, GAME).then(function(result){
				console.log(result);
				return result;
			});

		});
		it("server is continued", function(done){
			setTimeout(function(){done()},500);
		});		

	});
});