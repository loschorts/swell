var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var _counties = {};

CountyStore = new Store(Dispatcher);

CountyStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case "SET_COUNTY_FORECAST":
			this.setCountyForecast(payload.spitcast_county, payload.forecast);
			break;
	}
};

CountyStore.setCountyForecast = function(spitcast_county, forecast){
	_counties[spitcast_county] = forecast;
	this.__emitChange();
};

CountyStore.getCountyForecast = function(spitcast_county){
	return _counties[spitcast_county]; 
};

CountyStore.all = function(){
	return _counties;
};

CountyStore.getCurrentCountyForecast = function(spitcast_county){
	var _forecast = this.getCountyForecast(spitcast_county);

	return {
		swell: this.findCurrentValue(_forecast.swell),
		wind: this.findCurrentValue(_forecast.wind),
		tide: this.findCurrentValue(_forecast.tide)
	};
};

CountyStore.findCurrentValue = function(data){
	var hour = new Date().getHours();

	if (hour === 0){
		hour = "12AM";
	} else if (hour < 12) {
		hour += "AM";
	} else {
		hour = (hour % 12) + "PM";
	}
	
	var _result = null;

	data.forEach(function(datum){
		if (datum.hour == hour) {
			_result = datum;
			return;
		}
	});

	return _result;
}

CountyStore.emptyCountyForecast = {
	swell: {},
	wind: {},
	tide: {}
};




module.exports = CountyStore;