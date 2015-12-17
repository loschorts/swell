var SpotActions = require('../actions/spot_actions');
var UserStore = require('../stores/user_store');

var SpotApiUtil = {
	getSpotById: function(id){
		$.ajax({
			url: 'api/spots/'+ id,
			type: 'GET',
			data: {},
			success: function(spot){
				SpotActions.updateSpot(spot);
			}
		});
	},
	getAllSpots: function(){
		console.log('spotAPIUtil, get all spots');
		$.ajax({
			url: 'api/spots/',
			type: 'GET',
			data: {},
			success: function(spots){
				SpotActions.setAll(spots);
			}

		});
	}
};

module.exports = SpotApiUtil;