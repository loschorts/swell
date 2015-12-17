var UserActions = require('../actions/user_actions');
var UserStore = require('../stores/user_store');


var APIUtil = {
	login: function(user){
		$.ajax({
			url: '/session',
			type: 'POST',
			data: {user: user},
			success: function(user){
				console.log("success");
				UserActions.login(user);
			},
			error: function(request, error){
				console.log(arguments);
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


	}
};

module.exports = APIUtil;