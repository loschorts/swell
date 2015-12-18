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
	fetchWaterTemp: function(){
		$.ajax({
			url: 'http://api.spitcast.com/api/county/water-temperature/' + county + '/',
			type: 'GET',
			success: function(data){
				console.log(data);	
				_countyForecast.water_temp = data;
			}
		});
	},
	fetchCountyForecast: function(spitcast_county){
		var _countyForecast = {};
		$.ajax({
			url: 'http://api.spitcast.com/api/county/swell/' + spitcast_county + '/',
			type: 'GET',
			success: function(data){
				_countyForecast.swell = data;
				$.ajax({
					url: 'http://api.spitcast.com/api/county/wind/' + spitcast_county + '/',
					type: 'GET',
					success: function(data){
						_countyForecast.wind = data;
						$.ajax({
							url: 'http://api.spitcast.com/api/county/tide/' + spitcast_county + '/',
							type: 'GET',	
							success: function(data){
								_countyForecast.tide = data;
								SpotActions.setCountyForecast(spitcast_county, _countyForecast);
							}						
						});
					}
				});
			}
		});
	}
};

module.exports = SpotApiUtil;