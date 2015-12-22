var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var TimeUtil = require('../util/time_util');

var _counties = {};

CountyForecastStore = new Store(Dispatcher);

CountyForecastStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case "SET_COUNTY_FORECAST":
			this.setCountyForecast(payload.county, payload.forecast);
			break;
	}
};

CountyForecastStore.setCountyForecast = function(county, forecast){
	_counties[county] = forecast;
	this.__emitChange();
};

CountyForecastStore.getCountyForecast = function(county){
	return _counties[county]; 
};

CountyForecastStore.getCurrentCountyForecast = function(county){
	var _forecast = this.getCountyForecast(county);
	
	var swellDetail = this.findCurrentValue(_forecast.swell);
	var windDetail = this.findCurrentValue(_forecast.wind);
	var tideDetail = this.findCurrentValue(_forecast.tide);
	
	var swell =  this.swellSummary(swellDetail);
	var wind = this.windSummary(windDetail);
	var tide = this.tideSummary(tideDetail);
	tide.flow = this.getCurrentTideDirection(county);
	
	return {
		swellDetail: swellDetail,
		windDetail: windDetail,
		tideDetail: tideDetail,
		swell: swell,
		wind: wind,
		tide: tide,
	};
};

CountyForecastStore.swellSummary = function(detail){
	var result = {};
	result[0] = detail["0"];
	result[1] = detail["1"];
	result[2] = detail["2"];
	return result;
};

CountyForecastStore.windSummary = function(detail){
	var result = {};
	result.degrees = detail.direction_degrees;
	result.text = detail.direction_text;
	result.mph = detail.speed_mph;
	return result;
};

CountyForecastStore.tideSummary = function(detail){
	var result = {};
	result.tide = detail.tide;
	return result;
};

CountyForecastStore.getCurrentTideDirection = function(county){
	var _tides = CountyForecastStore.getCountyForecast(county).tide;

	var now = new Date().getHours();

	var next = now + 1;

	next = this.findValueAtTime(next, _tides);
	now = this.findValueAtTime(now, _tides);

	if (next-now > 0) {
		return "rising";
	} else {
		return "falling";
	}
};

CountyForecastStore.findValueAtTime = function(hour, set){

	var _result = null;

	set.forEach(function(entry){
		if (entry.hour == hour) {
			_result = entry;
			return;
		}
	});

	return _result;
};

CountyForecastStore.findCurrentValue = function(set){
	var hour = TimeUtil.now();

	var _result = null;

	set.forEach(function(entry){
		if (entry.hour === hour) {
			_result = entry;
			return;
		}
	});
	return _result;
};

CountyForecastStore.emptyCountyForecast = {
	swell: {},
	wind: {},
	tide: {},
	waterTemp: {}
};




module.exports = CountyForecastStore;