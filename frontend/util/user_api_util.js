var UserActions = require('../actions/user_actions');
var UserStore = require('../stores/user_store');

var UserAPIUtil = {
	
	login: function(user){
		$.ajax({
			url: '/session',
			type: 'POST',
			data: {user: user},
			success: function(user){
				UserActions.login(user);
			},
			error: function(request, error){
				console.log('cant do because ' + error);
			}
		});
	},
	logout: function(){
		var user = UserStore.currentUser();
		if (typeof user === 'undefined'){
			return;
		}

		$.ajax({
			url: '/session',
			type: 'DELETE',
			data: {user: user},
			success: function(user){
				UserActions.logout(user);
			},
			error: function(request, error){
				console.log(arguments);
				console.log('cant do because ' + error);
			}
		});
	},
	guestLogin: function(){
		this.login({username: 'guest', password: 'guestguest'});
	},
	createUser: function(user){
		$.ajax({
			url: 'api/users',
			type: 'POST',
			data: {user: user},
			success: function(user){
				console.log("created" + user.username);
				UserActions.login(user);
			},
			error: function(request, error){
				console.log(arguments);
				console.log('cant do because ' + error);
			}
		});
	},
};

module.exports = UserAPIUtil;