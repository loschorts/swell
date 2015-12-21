var Dispatcher = require('../dispatcher/dispatcher');

SpotActions = {
	setSpot: function(spot){
		Dispatcher.dispatch({
			actionType: "SET_SPOT",
			spot: spot
		});
	}
};

module.exports = SpotActions;