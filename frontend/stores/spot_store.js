var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var SpotAPIUtil = require('../util/spot_api_util');

var SpotStore = new Store(Dispatcher);

var _spots = {};

SpotStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case "SET_SPOT":
			this.setSpot(payload.spot);
			break;
		case "SET_SPOT_WEATHER":
			this.setSpotWeather(payload.spot, payload.weather);
			break;
	}
};

SpotStore.setSpot = function(spot){
	_spots[spot.id] = spot;
	this.__emitChange();
};

SpotStore.all = function(){
	return _spots;
};

SpotStore.getSpot = function(id){
	return _spots[id];
};

SpotStore.setSpotWeather = function(spot, weather){
	spot.weather = weather;
	_spots[spot.id] = spot;
	this.__emitChange();
};

SpotStore.emptySpot = {
	id: null,
	spitcast_id: null,
	spitcast_county: null,
	lat: null,
	lng: null,
	name: null,
	description: null,
	county_name: null,
	neighbors: null
};

module.exports = SpotStore;