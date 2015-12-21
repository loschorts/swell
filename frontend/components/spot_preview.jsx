var React = require('react');
var SpotAPIUtil = require('../util/spot_api_util');
var ForecastAPIUtil = require('../util/forecast_api_util');

var SpotStore = require('../stores/spot_store');
window.ForecastStore = require('../stores/forecast_store');

var SpotPreview = React.createClass({
	getInitialState: function(){
		return ({
			spot: SpotStore.emptySpot,
			forecast: ForecastStore.emptyForecast
		});
	},
	componentDidMount: function(){
		SpotStore.addListener(this.updateSpot);
		ForecastStore.addListener(this.updateForecast);
		SpotAPIUtil.fetchSpot(this.props.spotId);
	},
	updateSpot: function(){
		var spot = SpotStore.getSpot(this.props.spotId);
		this.setState({spot: spot});
	},
	updateForecast: function(){
		var forecast = ForecastStore.getCurrentSpotForecast(this.state.spot);
		this.setState({forecast: forecast});
	},
	componentWillUpdate: function(nextProps, nextState){
		if (typeof nextState.spot.id !== 'undefined' && 
			nextState.spot.id !== this.state.spot.id) {
			ForecastAPIUtil.fetchSpotForecast(nextState.spot);
		}
	},
	render: function(){
		var _forecast = this.state.forecast;
		return (
			<div className="spot-focus">
				<h4>SpotPreview for {this.state.spot.name}</h4>
				<ul>
					<li className="detail">Hour: {_forecast.hour}</li>
					<li className="detail">Size: {_forecast.size}</li>
					<li className="detail">Quality: {_forecast.quality}</li>
					<li className="detail">Swell: {_forecast.swell_quality}</li>
					<li className="detail">Tide: {_forecast.tide_quality}</li>
					<li className="detail">Wind: {_forecast.wind_quality}</li>

				</ul>
			</div>
		);
	},
});

module.exports = SpotPreview;