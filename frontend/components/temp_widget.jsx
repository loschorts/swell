var React = require('react');
var SpotStore = require('../stores/spot_store');
var SpotAPIUtil = require('../util/spot_api_util');
var ForecastAPIUtil = require('../util/forecast_api_util');
var ForecastStore = require('../stores/forecast_store');
var CountyForecastStore = require('../stores/county_forecast_store');

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

		ForecastAPIUtil.fetchTemps(spot);

	},
	render: function(){
		return (
			<div className="widget">
				HELLO					
			</div>
		);
	}
});

module.exports = TempWidget;