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
		$.ajax({
			url: 'api/spots/',
			type: 'GET',
			data: {},
			success: function(spots){
				SpotActions.setAll(spots);
			}

		});
	},
	fetchForecast: function(spot){

		$.ajax({
			url: 'http://api.spitcast.com/api/spot/forecast/' + spot.spitcast_id + '/',
			type: 'GET',
			success: function(forecast){
				
			}
		});
	},
	fetchMultiForecasts: function(spots){

	}
};

module.exports = SpotApiUtil;