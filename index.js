var request = require('request');
var Q = require("q");

var utils = require("soa-example-core-utils");

var config = require("soa-example-service-config").config();

var redisUtil = require('soa-example-redis-util');

var createUser = function(emailAddress, password){
	var deferred = Q.defer();

	var url = utils.createBaseUrl(config.userServiceIp, config.userServicePort);

	var object = {
		emailAddress: emailAddress,
		password: password
	};

	utils.postJson(object, url + "/register").then(function(user){
		deferred.resolve(user);
	});

	return deferred.promise;
};

var getUserById = function(id, token){
	var deferred = Q.defer();

	redisUtil.get(id).then(function(user){
		if ( user ){
			console.log("User by ID found in Redis");
			deferred.resolve(user);
			return;
		}

		var url = utils.createBaseUrl(config.userServiceIp, config.userServicePort);
		
		utils.get(url + "/users/" + id).then(function(user){	
			redisUtil.put(id, user);
			deferred.resolve(user);
		});
	});

	return deferred.promise;
};

var getUserByEmailAddress = function(emailAddress){
	var deferred = Q.defer();

	redisUtil.get(emailAddress).then(function(user){
		if ( user ){
			console.log("User by Email found in Redis");
			deferred.resolve(user);
			return;
		}

		var url = utils.createBaseUrl(config.userServiceIp, config.userServicePort);
	
		utils.get(url + "/users/" + emailAddress).then(function(user){
			redisUtil.put(emailAddress, user);
			deferred.resolve(user);
		});
	});

	return deferred.promise;
};

var getUserByToken = function(token){
	var deferred = Q.defer();

	redisUtil.get(token).then(function(user){
		if ( user ){
			console.log("User by Access Token found in Redis");
			deferred.resolve(user);
			return;
		}

		var url = utils.createBaseUrl(config.userServiceIp, config.userServicePort);
	
		utils.get(url + "/users/accessToken/" + token).then(function(user){
			redisUtil.put(token, user);
			deferred.resolve(user);
		});
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
	getUsers : getUsers,
	createUser: createUser
}