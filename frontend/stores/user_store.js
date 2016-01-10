var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var UserStore = new Store(Dispatcher);

var nullUser = {username: null, id: null, favorites: []};

var _currentUser = nullUser;

UserStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case "LOGIN":
			UserStore.login(payload.user);
			break;
		case "LOGOUT":
			UserStore.logout();
			break;
		case "UPDATE":
			UserStore.update(payload.user);
			break;
	}
};

UserStore.currentUser = function(){
	return _currentUser;
};

UserStore.nullUser = function(){
	return nullUser;
};

UserStore.login = function(user){
	_currentUser = user;
	UserStore.__emitChange();
};

UserStore.logout = function(){
	_currentUser = this.nullUser;
	UserStore.__emitChange();
};

UserStore.update = function(user){
	_currentUser = user;
	UserStore.__emitChange();
};

module.exports = UserStore;