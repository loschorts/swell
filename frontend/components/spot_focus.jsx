var React = require('react');
var SpotAPIUtil = require('../util/spot_api_util');
var ForecastAPIUtil = require('../util/forecast_api_util');

var SpotStore = require('../stores/spot_store');
var CountyForecastStore = require('../stores/county_forecast_store');
var ForecastStore = require('../stores/forecast_store');

var FavoriteButton = require('./favorite_button');

var SpotFocus = React.createClass({
	getInitialState: function(){
		return({
			spot: SpotStore.emptySpot,
			spotForecast: ForecastStore.emptyForecast,
			countyForecast: CountyForecastStore.emptyCountyForecast
		});
	},
	componentDidMount: function(){
		SpotStore.addListener(this.updateSpot);
		ForecastStore.addListener(this.updateForecast);
		CountyForecastStore.addListener(this.updateCountyForecast);
		SpotAPIUtil.fetchSpot(this.props.spotId);
	},
	updateSpot: function(){
		var spot = SpotStore.getSpot(this.props.spotId);
		this.setState({spot: spot});
	},
	updateForecast: function(){
		var forecast = ForecastStore.getCurrentSpotForecast(this.state.spot);
		this.setState({spotForecast: forecast});
	},
	updateCountyForecast: function(){
		var countyForecast = CountyForecastStore.getCurrentCountyForecast(this.state.spot.spitcast_county);
		this.setState({countyForecast: countyForecast});
	},
	componentWillUpdate: function(nextProps, nextState){
		if (typeof nextState.spot.id !== 'undefined' && 
			nextState.spot.id !== this.state.spot.id) {
			ForecastAPIUtil.fetchSpotForecast(nextState.spot);
			ForecastAPIUtil.fetchCountyForecast(nextState.spot.spitcast_county);
		}
	},
	quality: function(){
		var quality = this.state.spotForecast.quality;

		switch (quality){
			case "Good":
			case "Fair-Good":
				return "spot-quality-good";
			case "Fair":
				return "spot-quality-fair";
			case "Poor-Fair":
			case "Poor": 
				return "spot-quality-poor";
			default:
				return "spot-quality-unknown";
		}
	},
	go: function(){
		console.log(this.props.history);
		this.props.history.push("/forecast/" + this.props.spotId);
	},
	render: function(){		
		var spotForecast = this.state.spotForecast;
		var countyForecast = this.state.countyForecast;
		var _swell = JSON.stringify(countyForecast.swell);
		var _wind = JSON.stringify(countyForecast.wind);
		var _tide = JSON.stringify(countyForecast.tide);
		return (
			<div className={"jumbotron spot-focus " + this.quality()}
				onClick={this.go}>
				<h4>SpotFocus for {this.state.spot.name}</h4>
				<ul>
					<FavoriteButton id={this.props.spotId}/>
					<li className="detail">Hour: {spotForecast.hour}</li>
					<li className="detail">Size: {spotForecast.size} ft</li>
					<li className="detail">Quality: {spotForecast.quality}</li>
					<li className="detail">Swell Quality: {spotForecast.swell_quality}</li>
					<li className="detail">Tide Quality: {spotForecast.tide_quality}</li>
					<li className="detail">Wind Quality: {spotForecast.wind_quality}</li>
					<li className="detail">Swell Summary: {_swell}</li>
					<li className="detail">Wind Summary: {_wind}</li>
					<li className="detail">Tide Summary: {_tide}</li>
				</ul>
			</div>
		);
	}
});

module.exports = SpotFocus;