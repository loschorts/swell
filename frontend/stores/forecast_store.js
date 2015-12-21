var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var ForecastAPIUtil = require('../util/forecast_api_util');
var TimeUtil = require('../util/time_util');

var ForecastStore = new Store(Dispatcher);

var _spot_forecasts = {};
var _county_forecasts = {};

ForecastStore.__onDispatch = function(payload){
	switch (payload.actionType){
	case "SET_SPOT_FORECAST":
		this.setSpotForecast(payload.spot, payload.forecast);
		break;
	case "SET_COUNTY_FORECAST":
		this.setCountyForecast(payload.county, payload.forecast);
		break;
	}
};

ForecastStore.inspect = function(){
	console.log(_spot_forecasts);
	console.log(_county_forecasts);
};

ForecastStore.getSpotForecast = function(spot){
	return _spot_forecasts[spot.id];
};

ForecastStore.setSpotForecast = function(spot, forecast){
	_spot_forecasts[spot.id] = forecast;
	this.__emitChange();
};

ForecastStore.getCountyForecast = function(spitcast_county){
	return _county_forecasts[spitcast_county];
};

ForecastStore.setCountyForecast = function(spitcast_county, forecast){
	_spot_forecasts[spitcast_county] = forecast;
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

ForecastStore.getCurrentCountyForecast = function(county){

	var now = TimeUtil.now();

	var currentForecast = null;

	_county_forecasts[spot].forEach(function(entry){
		if (entry.hour === now){
			return entry;
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