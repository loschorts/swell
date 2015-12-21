var SpotActions = require('../actions/spot_actions');
var UserStore = require('../stores/user_store');

var SpotApiUtil = {
	fetchSpot: function(id){
		$.ajax({
			url: 'api/spots/'+ id,
			type: 'GET',
			data: {},
			success: function(spot){
				SpotActions.setSpot(spot);
			}
		});
	},

};

module.exports = SpotApiUtil;