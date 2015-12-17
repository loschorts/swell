var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var UserStore = new Store(Dispatcher);

var _currentUser = null;

UserStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case "LOGIN":
			UserStore.login(payload.user);
			break;
		case "LOGOUT":
			UserStore.logout();
			break;
	}
};

UserStore.currentUser = function(){
	return _currentUser;
};


UserStore.login = function(user){
	_currentUser = user;
	UserStore.__emitChange();
};

UserStore.logout = function(){
	_currentUser = null;
	UserStore.__emitChange();
};

module.exports = UserStore;