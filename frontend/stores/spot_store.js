var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var SpotStore = new Store(Dispatcher);

var _spots = [];

SpotStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case "UPDATE_SPOT":
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
	console.log('update spot');
	var idx = this.findSpot(spot.id);
	if (idx){
		_spots[idx] = spot;
		this.__emitChange();
	} else {
		this.addSpot(spot);
	}
};

SpotStore.findSpot = function(id){
	var _spotIdx = null;
	_spots.forEach(function(spot, idx){
		if (spot.id === id) {
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
};

SpotStore.show = function(id){
	idx = SpotStore.findSpot(id);
	return _spots[idx];
};

module.exports = SpotStore;