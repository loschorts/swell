var Dispatcher = require('../dispatcher/dispatcher');

ForecastActions = {
	setSpotForecast: function(spot, forecast){
		Dispatcher.dispatch({
			actionType: "SET_SPOT_FORECAST",
			spot: spot,
			forecast: forecast
		});		
	},
	setCountyForecast: function(county, forecast){
		Dispatcher.dispatch({
			actionType: "SET_COUNTY_FORECAST",
			county: county,
			forecast: forecast
		});	
	},
	setSpotWeather: function(spot, weather){
		Dispatcher.dispatch({
			actionType: "SET_SPOT_WEATHER",
			spot: spot,
			weather: weather
		});
	}
};

module.exports = ForecastActions;