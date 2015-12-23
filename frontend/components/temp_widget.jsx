var React = require('react');
var SpotStore = require('../stores/spot_store');
var SpotAPIUtil = require('../util/spot_api_util');
var ForecastAPIUtil = require('../util/forecast_api_util');

var TempWidget = React.createClass({
	componentDidMount: function(){
		SpotStore.addListener(this.updateSpot);
		var _spot = SpotStore.getSpot(this.props.spotId);
		if (!_spot) {
			SpotAPIUtil.fetchSpot(this.props.spotId);
		} else {
			this.updateSpot();
		}
	},
	updateSpot: function(){
		this.setState({
			spot: SpotStore.getSpot(this.props.spotId)
		});
		if (this.state && this.state.spot && !this.state.spot.weather) {
			ForecastAPIUtil.fetchWeather(this.state.spot);
		}
	},
	stringify: function(){
		return JSON.stringify(this.state);
	},
	render: function(){
		if (!this.state || !this.state.spot || !this.state.spot.weather){
			return <div/>;
		} else {
			weather = this.state.spot.weather;
			if (weather.conditions === 'undefined-undefined') {
				weather.conditions = 'unknown';
			}
			return (
				<div className="widget">
					<h4>Current Weather</h4>
					<h5>Temp: {weather.airTemp}°</h5>
					<h5>Water Temp: {weather.waterTemp}°</h5>
					<h5>Conditions: {weather.conditions}</h5>
					<h5>Live Wind: {weather.wind.speed}mph @ {weather.wind.deg}°</h5>
				</div>
			);
		}
	}
});

module.exports = TempWidget;