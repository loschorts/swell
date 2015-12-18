var React = require('react');
var SpotAPIUtil = require('../util/spot_api_util');
var SpotStore = require('../stores/spot_store');

var SpotFocus = React.createClass({
	getInitialState: function(){
		return ({forecast: SpotStore.emptyForecast});
	},
	componentDidMount: function(){
		SpotStore.addListener(this.receiveForecast);
		SpotAPIUtil.fetchForecast(this.props.spot);
	},
	receiveForecast: function(){	
		var _forecast = SpotStore.getCurrentForecast(this.props.spot.id);
		this.setState({forecast: _forecast});
	},
	render: function(){
		var _forecast = this.state.forecast;
		return (
			<div className="spot-focus">
				<h3>SpotFocus for {this.props.spot.name}</h3>
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

module.exports = SpotFocus;