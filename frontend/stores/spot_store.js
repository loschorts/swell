var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var SpotStore = new Store(Dispatcher);

var _spots = [];

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
	}
};

SpotStore.setAll = function(spots){
	_spots = spots;
	this.__emitChange();
};

SpotStore.updateSpot = function(spot){
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

SpotStore.setForecast = function(spot, forecast){
	spot.forecast = forecast;
	this.updateSpot(spot);
	this.__emitChange();
};

SpotStore.emptyForecast = {forecast: {
					hour: "dummy",
					size: "dummy",
					quality: "dummy",
					wind_quality: "dummy",
					wave_quality: "dummy",
					tide_quality: "dummy",
					}};

SpotStore.getCurrentForecast = function(id){
	var _spot = _spots[this.findSpot(id)]
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
	return _spots[this.findSpot(id)].forecast;
};

module.exports = SpotStore;