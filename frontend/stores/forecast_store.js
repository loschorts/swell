var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var ForecastAPIUtil = require('../util/forecast_api_util');
var TimeUtil = require('../util/time_util');

var ForecastStore = new Store(Dispatcher);

var _spot_forecasts = {};

ForecastStore.__onDispatch = function(payload){
	switch (payload.actionType){
	case "SET_SPOT_FORECAST":
		this.setSpotForecast(payload.spot, payload.forecast);
		break;
	}
};

ForecastStore.getSpotForecast = function(spot){
	return _spot_forecasts[spot.id];
};

ForecastStore.setSpotForecast = function(spot, forecast){
	_spot_forecasts[spot.id] = forecast;
	this.__emitChange();
};

ForecastStore.getCurrentSpotForecast = function(spot){
	var now = TimeUtil.now();

	var currentForecast = null;

	_spot_forecasts[spot.id].forEach(function(entry){
		if (entry.hour === now){
			currentForecast= entry;
			return;
		}
	});

	return currentForecast;
};

ForecastStore.emptyForecast = {
	date: null, 
	day: null, 
	gmt: null, 
	hour: null, 
	latitude: null,
	live: null, 
	longitude: null, 
	shape: null, 
	shape_detail: null, 
	shape_full: null, 
	size: null, 
	size_ft: null,
	spot_id: null, 
	spot_name: null, 
	warnings: null
};

module.exports = ForecastStore;