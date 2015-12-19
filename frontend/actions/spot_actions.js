var Dispatcher = require('../dispatcher/dispatcher');

SpotActions = {
	updateSpot: function(spot){
		Dispatcher.dispatch({
			actionType: "UPDATE_SPOT",
			spot: spot
		});
	},
	setAll: function(spots){
		Dispatcher.dispatch({
			actionType: "ALL_SPOTS",
			spots: spots
		});
	},
	setForecast: function(spot, forecast){
		Dispatcher.dispatch({
			actionType: "SET_FORECAST",
			spot: spot,
			forecast: forecast
		});
	},
	setCountyForecast: function(spitcast_county, forecast){
		Dispatcher.dispatch({
			actionType: "SET_COUNTY_FORECAST",
			spitcast_county: spitcast_county,
			forecast: forecast
		});
	},
	setNeighbors: function(spot, neighbors){
		Dispatcher.dispatch({
			actionType: "SET_NEIGHBORS",
			spot: spot,
			neighbors: neighbors
		});
	}
};

module.exports = SpotActions;