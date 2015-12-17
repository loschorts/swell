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
};

module.exports = SpotActions;