var request = require('request');
var Q = require("q");

var utils = require("soa-example-core-utils");

var config = require("soa-example-service-config").config();

var getUserById = function(id, token){
	var deferred = Q.defer();
	
	var url = utils.createBaseUrl(config.userServiceIp, config.userServicePort);
	utils.get(url + "/users/" + id).then(function(user){
		deferred.resolve(user);
	});

	return deferred.promise;
};

var getUserByEmailAddress = function(emailAddress){
	var deferred = Q.defer();

	var url = utils.createBaseUrl(config.userServiceIp, config.userServicePort);
	
	utils.get(url + "/users/" + emailAddress).then(function(user){
		deferred.resolve(user);
	});

	return deferred.promise;
};

var getUserByToken = function(token){
	var deferred = Q.defer();
	
	var url = utils.createBaseUrl(config.userServiceIp, config.userServicePort);
	
	utils.get(url + "/users/accessToken/" + token).then(function(user){
		deferred.resolve(user);
	});

	return deferred.promise;
};

var getUsers = function(token){
	var deferred = Q.defer();
	
	utils.get(url + "/users").then(function(users){
		deferred.resolve(users);
	});

	return deferred.promise;
};


module.exports = {
	getUserById : getUserById,
	getUserByEmailAddress : getUserByEmailAddress,
	getUserByToken : getUserByToken,
	getUsers : getUsers
}