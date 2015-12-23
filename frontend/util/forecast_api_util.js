var ForecastActions = require('../actions/forecast_actions');
var UserStore = require('../stores/user_store');

var ForecastAPIUtil = {
	fetchSpotForecast: function(spot){
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
				ForecastActions.setSpotForecast(spot, forecast);
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
								ForecastActions.setCountyForecast(spitcast_county, _countyForecast);
							}						
						});
					}
				});
			}
		});
	},
	fetchWeather: function(spot){
		var weather = {};
		$.ajax({
			url: 'http://api.spitcast.com/api/county/water-temperature/' + spitcast_county + '/',
			type: 'GET',
			success: function(data){
				weather.waterTemp = data.fahrenheit;
				$.ajax({
					url:'http://api.openweathermap.org/data/2.5/weather?lat=' + spot.lat + '&lon=' + spot.lng +'&appid=7fc03a03fe39e22c9557c07d4e05cb2d',
					type: 'GET',
					success: function(data){
					weather.airTemp = (data.main.temp -273.15) * 1.8 + 32;
					weather.conditions = data.weather.main + "-" + data.weather.description;
					weather.wind = {speed: data.wind.speed, deg: data.wind.deg};

					ForecastActions.setSpotWeather(spot, weather);
					}
				});
			}
		})
	}
};

module.exports = ForecastAPIUtil;