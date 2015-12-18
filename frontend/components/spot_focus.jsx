var React = require('react');
var SpotAPIUtil = require('../util/spot_api_util');
var SpotStore = require('../stores/spot_store');
var CountyStore = require('../stores/county_store');

var SpotFocus = React.createClass({
	getInitialState: function(){
		return ({
			forecast: SpotStore.emptyForecast,
			countyForecast: null
		});
	},
	componentDidMount: function(){
		SpotStore.addListener(this.receiveForecast);
		CountyStore.addListener(this.receiveCountyForecast);
		SpotAPIUtil.fetchForecast(this.props.spot);
		SpotAPIUtil.fetchCountyForecast(this.props.spot.spitcast_county);
	},
	receiveForecast: function(){	
		var _forecast = SpotStore.getCurrentForecast(this.props.spot.id);
		this.setState({forecast: _forecast});
	},
	receiveCountyForecast: function(){
		var _forecast = CountyStore.getCurrentCountyForecast(this.props.spot.spitcast_county);
		this.setState({countyForecast: _forecast});
	},
	county: function(){
		return JSON.stringify(this.state.countyForecast);
	},
	swells: function(){
		if (this.state.countyForecast === null) {
			return;
		}

		var _data = this.state.countyForecast.swell;
		var _swells = [];

		for (var s = 0 ; s < 3 ; s++) {
			_swells.push({
				index: s,
				height: _data[s].hs,
				period: _data[s].tp
			});
		}
		var result = _swells.map(function(s){return JSON.stringify(s)});
		return result;
	},
	winds: function(){
		if (this.state.countyForecast === null) {
			return;
		}		
		var _data = this.state.countyForecast.wind;

		return (JSON.stringify({
			degrees: _data.direction_degrees,
			direction: _data.direction_text,
			speed: _data.speed_mph
		}));
	},
	tides: function(){
		if (this.state.countyForecast === null) {
			return;
		}	
		var _data = this.state.countyForecast.tide;
		var _direction = CountyStore.getCurrentTideDirection(this.props.spot.spitcast_county);

		return (JSON.stringify({
			tide: _data.tide,
			direction: _direction
		}));
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
					<li className="detail">Swells: {this.swells()} </li>
					<li className="detail">Wind Details: {this.winds()} </li>
					<li className="detail">Tide: {this.tides()} </li>
				</ul>
			</div>
		);
	},
});

module.exports = SpotFocus;