var React = require('react');
var SpotAPIUtil = require('../util/spot_api_util');
var ForecastAPIUtil = require('../util/forecast_api_util');

var SpotStore = require('../stores/spot_store');
var CountyForecastStore = require('../stores/county_forecast_store');

var SwellChart = require('./swell_chart');

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
	render: function(){
		if (!this.state || !this.state.countyForecast) {
			return <div>Fetching Forecast</div>;
		} else {		
			return	(<div>
						<SwellChart swellData={this.state.countyForecast.swell}/>
					</div>);
		}
	}
});


module.exports = Forecast;