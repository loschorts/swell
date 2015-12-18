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
	},
	componentDidUpdate: function(){
		SpotAPIUtil.fetchForecast(this.props.spot);
	},
	receiveForecast: function(){		
		var _forecast = SpotStore.getForecast(this.props.spot.id);
		this.setState({forecast: _forecast});
	},
	render: function(){
		debugger
		if (typeof this.props.spot === 'undefined') {
			return (<div className="spot-focus"/>);
		} else {		
			return (
				<div className="spot-focus">

					<div className="highlight">Name: {this.props.spot.name}</div>
					<div className="highlight">Quality: {this.state.forecast.quality}</div>

					<div className="detail">Wind: {this.state.forecast.wind}</div>
					<div className="detail">Wave_Height: {this.state.forecast.wave_height}</div>
					<div className="detail">Tide: {this.state.forecast.tide}</div>
					
					<div className="detail mini">Air: {this.state.forecast.air_temp}</div>
					<div className="detail mini">Water: {this.state.forecast.water_temp}</div>
				</div>
			);
		}
	}
});

module.exports = SpotFocus;