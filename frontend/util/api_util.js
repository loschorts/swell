var UserActions = require('../actions/user_actions');

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
	}
};

module.exports = APIUtil;