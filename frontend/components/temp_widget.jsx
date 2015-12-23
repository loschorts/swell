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
		return (
			<div className="widget">
				{this.stringify()}					
			</div>
		);
	}
});

module.exports = TempWidget;