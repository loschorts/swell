var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var SpotStore = new Store(Dispatcher);

var _spots = [];

SpotStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case "GET_SPOT":
			SpotStore.updateSpot(payload.spot);
			break;
		case "ALL_SPOTS":
			SpotStore.setAll(payload.spots);
			break;
	}
};

SpotStore.setAll = function(spots){
	_spots = spots;
	this.__emitChange();
};

SpotStore.updateSpot = function(spot){
	var idx = this.findSpot(spot);
	if (idx){
		_spots[idx] = spot;
		this.__emitChange();
	} else {
		this.addSpot(spot);
	}
};

SpotStore.findSpot = function(spot){
	var _spotIdx = null;
	_spots.forEach(function(check, idx){
		if (check.id === spot.id) {
			_spotIdx = idx;
			return;
		}
	});
	return _spotIdx;
};

SpotStore.addSpot = function(spot){
	_spots.push(spot);
	this.__emitChange();
};

SpotStore.all = function(){
	return _spots.slice();
}

module.exports = SpotStore;