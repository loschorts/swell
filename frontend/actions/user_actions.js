var Dispatcher = require('../dispatcher/dispatcher');

UserActions = {
	login: function(user){
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
	},
	show: function(user){
		Dispatcher.dispatch({
			actionType: "SHOW_USER",
			user: user
		});
	},
	update: function(user){
		Dispatcher.dispatch({
			actionType: "UPDATE",
			user: user
		});
	}
};

module.exports = UserActions;