var request = require('request');
var Q = require("q");

var utils = require("soa-example-core-utils");

var config = require("soa-example-service-config").config();

var getUserById = function(id, token){
	var deferred = Q.defer();
	
	var url = utils.createBaseUrl(config.userServiceIp, config.userServicePort);
	request.get(url + "/users/" + id, function(err, response, body){
		if ( err ){
			deferred.reject(err);
		}
		else{
			deferred.resolve(body);
		}
	});

	return deferred.promise;
};

var getUserByEmailAddress = function(emailAddress){
	var deferred = Q.defer();
	
	var url = utils.createBaseUrl(config.userServiceIp, config.userServicePort);
	request.get(url + "/users/" + emailAddress, function(err, response, body){
		if ( err ){
			deferred.reject(err);
		}
		else{
			deferred.resolve(body);
		}
	});

	return deferred.promise;
};

var getUserByToken = function(token){
	var deferred = Q.defer();
	
	var url = utils.createBaseUrl(config.userServiceIp, config.userServicePort);
	request.get(url + "/users/accessToken/" + token, function(err, response, body){
		if ( err ){
			deferred.reject(err);
		}
		else{
			deferred.resolve(body);
		}
	});

	return deferred.promise;
};

var getUsers = function(token){
	var deferred = Q.defer();
	
	var url = utils.createBaseUrl(config.userServiceIp, config.userServicePort);
	request.get(url + "/users", function(err, response, body){
		if ( err ){
			deferred.reject(err);
		}
		else{
			deferred.resolve(body);
		}
	});

	return deferred.promise;
};


module.exports = {
	getUserById : getUserById,
	getUserByEmailAddress : getUserByEmailAddress,
	getUsers : getUsers
}