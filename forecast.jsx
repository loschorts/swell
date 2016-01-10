var React = require('react');

//Components
var HelloNavbar = require('./hello_navbar');
var SpotFocus = require('./spot_focus');
var SpotPreview = require('./spot_preview');
var SwellChart = require('./forecast_components/swell_chart.jsx');

//Stores & Utils
var UserStore = require('../stores/user_store');
var SpotStore = require('../stores/spot_store');
var CountyForecastStore = require('../stores/county_forecast_store');
var ForecastStore = require('../stores/forecast_store');
var UserAPIUtil = require('../util/user_api_util');
var SpotAPIUtil = require('../util/spot_api_util');
var ForecastAPIUtil = require('../util/forecast_api_util');

var Forecast = React.createClass({
  // getInitialState: function(){
  //   return({
  //     spot: SpotStore.emptySpot,
  //     spotForecast: ForecastStore.emptyForecast,
  //     countyForecast: CountyForecastStore.emptyCountyForecast
  //   });
  // },
  componentDidMount: function(){
    SpotStore.addListener(this.updateSpot);
    ForecastStore.addListener(this.updateForecast);
    CountyForecastStore.addListener(this.updateCountyForecast);
    SpotAPIUtil.fetchSpot(this.props.spotId);
  },
  updateSpot: function(){
    var spot = SpotStore.getSpot(this.props.spotId);
    this.setState({spot: spot});
    if (typeof spot !== 'undefined'){
      ForecastAPIUtil.fetchSpotForecast(this.state.spot);
      ForecastAPIUtil.fetchCountyForecast(this.state.spot.spitcast_county);    
    }
  },
  updateForecast: function(){
    var forecast = ForecastStore.getCurrentSpotForecast(this.state.spot);
    this.setState({spotForecast: forecast});
  },
  updateCountyForecast: function(){
    var countyForecast = CountyForecastStore.getCurrentCountyForecast(this.state.spot.spitcast_county);
    this.setState({countyForecast: countyForecast});
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
  forecast: function(){
    if (typeof this.state === 'undefined' ||
      typeof this.state.countyForecast === 'undefined') {
      return;
    }
    return (<SwellChart data={this.state.countyForecast.swellFull}/>);
  },
  render: function(){
    return(
      <div id="forecast"> 
        <HelloNavbar history={this.props.history}/>
        <SpotFocus spotId={this.props.spotId}/>
        {this.forecast()}
      </div>
    );
  }
});

module.exports = Forecast;





