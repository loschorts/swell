var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var SpotAPIUtil = require('../util/spot_api_util');

var SpotStore = new Store(Dispatcher);

var _spots = {};

SpotStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case "UPDATE_SPOT":
			this.updateSpot(payload.spot);
			break;
		case "ALL_SPOTS":
			this.setAll(payload.spots);
			break;
		case "SET_FORECAST":
			this.setForecast(payload.spot, payload.forecast);
			break;
		case "SET_NEIGHBORS":
			this.setNeighbors(payload.spot, payload.neighbors);
	}
};

SpotStore.setAll = function(spots){
	_spots = spots;
	this.__emitChange();
};

SpotStore.updateSpot = function(spot){
	_spots[spot.id] = spot;
	this.__emitChange();
};

SpotStore.findSpot = function(spot){
	return _spots[spot.id];
};

SpotStore.addSpot = function(spot){
	_spots[spot.id] = spot;
	this.__emitChange();
};

SpotStore.all = function(){
	return _spots;
};

SpotStore.show = function(id){
	return _spots[id];
};

SpotStore.setForecast = function(spot, forecast){
	spot.forecast = forecast;
	this.updateSpot(spot);
	this.__emitChange();
};

SpotStore.emptyForecast = {forecast: {
					hour: "",
					size: "",
					quality: "",
					wind_quality: "",
					wave_quality: "",
					tide_quality: "",
					}};

SpotStore.getCurrentForecast = function(id){
	var _spot = this.show(id);

	if (typeof _spot === 'undefined'){
		return this.emptyForecast;
	} else {		
		var _forecast = _spot.forecast;
	}

	var hour = new Date().getHours();

	if (hour === 0){
		hour = "12AM";
	} else if (hour < 12) {
		hour += "AM";
	} else {
		hour = (hour % 12) + "PM";
	}

	var _currentForecast;
	_forecast.forEach(function(forecastHour){
		if (hour === forecastHour.hour) {
			_currentForecast = forecastHour;
			return;
		}
	});
	
	return _currentForecast;
};

SpotStore.getFullForecast = function(id){
	return _spots[this.show(id)].forecast;
};

SpotStore.setNeighbors = function(spot, neighbors){
	var _spot = this.findSpot(spot);

	_spot.neighbors = neighbors;
	console.log('SpotStore.setNeighbors');
	spot.neighbors.forEach(function(neighbor){
		debugger
		// the problem is that you are bypassing the native API
		// and going straight to the 3rd party
		// fix by writing a new route that fetches neighbors from  SWELL 
		// by Spitcast-id
		SpotAPIUtil.fetchForecast({spitcast_id: neighbor.spot_id});
	});
	this.__emitChange();
};

SpotStore.getNeighbors = function(id){
	var spot = _spots[this.findSpot(id)];

	if (typeof spot.neighbors === 'undefined'){
		return [];
	} else {
		return spot.neighbors;
	}

};

module.exports = SpotStore;