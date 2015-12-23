var React = require('react');
var SpotAPIUtil = require('../util/spot_api_util');
var ForecastAPIUtil = require('../util/forecast_api_util');

var SpotStore = require('../stores/spot_store');
var CountyForecastStore = require('../stores/county_forecast_store');

var SwellChart = require('./swell_chart');
var WindChart = require('./wind_chart');
var TideChart = require('./tide_chart');

var SpotFocus = require('./spot_focus');

var Forecast = React.createClass({
	componentDidMount: function(){
		SpotStore.addListener(this.updateSpot);
		CountyForecastStore.addListener(this.updateCountyForecast);
		var _spot = SpotStore.getSpot(this.props.spotId);
		if (!_spot) {
			SpotAPIUtil.fetchSpot(this.props.spotId);
		} else {
			this.updateSpot();
		}
	},
	updateSpot: function(){
		this.setState({spot: SpotStore.getSpot(this.props.spotId)});
		this.updateCountyForecast();
	},
	updateCountyForecast: function(){
		var _forecast = CountyForecastStore.getCountyForecast(this.state.spot.spitcast_county);
		if (!_forecast) {
			ForecastAPIUtil.fetchCountyForecast(this.state.spot.spitcast_county);
		} else {
			this.setState({countyForecast: _forecast});
		}
	},
	stringify: function(data){
		return JSON.stringify(data);
	},
	render: function(){
		if (!this.state || !this.state.countyForecast) {
			return <div>Fetching Forecast</div>;
		} else {		
			return	(<div className="container">
						<div className="row"><SpotFocus spotId={this.props.spotId}/></div>
						<div className="row"><SwellChart data={this.state.countyForecast.swell}/></div>
						<div className="row"><WindChart data={this.state.countyForecast.wind}/></div>
						<div className="row"><TideChart data={this.state.countyForecast.tide}/></div>		
					</div>);
		}
	}
});


module.exports = Forecast;