var Dispatcher = require('../dispatcher/dispatcher');

UserActions = {
	login: function(user){
		console.log("user actions");
		Dispatcher.dispatch({
			actionType: "LOGIN",
			user: user
		});
	},
	logout: function(user){
		Dispatcher.dispatch({
			actionType: "LOGOUT",
			user: user
		});
	}
};

module.exports = UserActions;