var React = require('react');
var SpotAPIUtil = require('../util/spot_api_util');
var SpotStore = require('../stores/spot_store');

var SpotFocus = React.createClass({
	getInitialState: function(){
		return ({forecast: {
					name: "",
					quality: "",
					wind: "",
					wave_height: "",
					tide: "",
					air_temp: "",
					water_temp: "",
					}
				});
	},
	componentDidMount: function(){
		SpotStore.addListener(this.receiveForecast);
		SpotAPIUtil.fetchForecast(this.props.spot);

	},
	componentDidUpdate: function(){
		SpotAPIUtil.fetchForecast(this.props.spot);
	},
	receiveForecast: function(){		
		var _forecast = SpotStore.getCurrentForecast(this.props.spot.id);
		this.setState({forecast: _forecast});
	},
	renderForecast: function(){
		var _forecast = this.state.forecast;
		return (
			<div className="spot-focus">
				<h3>SpotFocus for {this.props.spot.name}</h3>
				<div className="detail">Hour: {_forecast.hour}</div>
				<div className="detail">Size: {_forecast.size}</div>
				<div className="detail">Quality: {_forecast.quality}</div>
				<div className="detail">Swell: {_forecast.swell_quality}</div>
				<div className="detail">Tide: {_forecast.tide_quality}</div>
				<div className="detail">Wind: {_forecast.wind_quality}</div>
			</div>
		);
	},
	render: function(){
		if (typeof this.props.spot === 'undefined') {
			return (<div className="spot-focus"/>);
		} else {		
			return this.renderForecast();
		}
	}
});

module.exports = SpotFocus;