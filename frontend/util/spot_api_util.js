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
			success: function(data){
				var forecast = data.map(function(entry){
					var formatted = {
						date: entry.date,
						day: entry.day,
						gmt: entry.gmt,
						hour: entry.hour,
						latitude: entry.latitude,
						longitude: entry.longitude,
						quality: entry.shape_full,
						swell_quality: entry.shape_detail.swell,
						tide_quality: entry.shape_detail.tide,
						wind_quality: entry.shape_detail.wind,
						size: parseFloat(entry.size_ft).toFixed(2),
						warnings: entry.warnings,
						spitcast_id: entry.spot_id,
						spot_name: entry.spot_name
					}
					return formatted;
				});

				SpotActions.setForecast(spot, forecast);
			}
		});
	},
	fetchCountyForecast: function(spot){
		var _countyForecast = {};
		$.ajax({
			url: 'http://api.spitcast.com/api/county/swell/' + spot.spitcast_county + '/',
			type: 'GET',
			success: function(data){	
				_countyForecast.swell = data;
				$.ajax({
					url: 'http://api.spitcast.com/api/county/wind/' + spot.spitcast_county + '/',
					type: 'GET',
					success: function(data){
						_countyForecast.wind = data;
						$.ajax({
							url: 'http://api.spitcast.com/api/county/tide/' + spot.spitcast_county + '/',
							type: 'GET',	
							success: function(data){
								_countyForecast.tide = data;
								$.ajax({
									url: 'http://api.spitcast.com/api/county/water-temperature/' + spot.spitcast_county + '/',
									type: 'GET',
									success: function(data){
										_countyForecast.water_temp = data;
									}
								});
							}						
						});
					}
				});
			}
		});
	}
};

module.exports = SpotApiUtil;