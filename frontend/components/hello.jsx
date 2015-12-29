var React = require('react');

//Components
var SpotFocus = require('./spot_focus');
var SpotPreview = require('./spot_preview');
var FavoriteButton = require('./favorite_button');

//Stores & Utils
var UserStore = require('../stores/user_store');
var SpotStore = require('../stores/spot_store');
var UserAPIUtil = require('../util/user_api_util');
var SpotAPIUtil = require('../util/spot_api_util');

var Hello = React.createClass({
  getInitialState: function(){
    return ({
      user: UserStore.currentUser(),
    });
  },
  componentDidMount: function(){
    UserStore.addListener(this.updateUser);
    UserAPIUtil.fetchCurrentUser();
  },
  updateUser: function(){
    this.setState({user: UserStore.currentUser()});
  },
  redirectForecast: function(id){
    this.props.history.push('/forecast/'+id);
  },
  home: function(){
    var homeId = this.state.user.favorites[0];
    if (!homeId) {
      return;
    }
    return (
        <div onClick={this.redirectForecast.bind(this, homeId)}>
          <h1>Home</h1>
          <SpotFocus spotId={homeId}/>
        </div>
    );
  },
  favorites: function(){
    if (this.state.user.favorites.length < 2) {
      return;
    }
    var favs = this.state.user.favorites.slice(1);
    var self = this;
    var els = favs.map(function(spotId, idx){
      return (
        <div className="col-md-4" onClick={self.redirectForecast.bind(self, spotId)}>
          <SpotPreview key={idx} spotId={spotId}/>
        </div>
      );
    });
    return <div className="container-fluid feature-box"><h3>Favorites</h3>{els}</div>;
  },
  neighbors: function(){
    var home = SpotStore.getSpot(this.state.user.favorites[0]);
    if (!home){ 
      return;
    }
    var self = this;
    var result = home.neighbors.map(function(neighborId, idx){
      return (
        <div className="col-md-4" onClick={self.redirectForecast.bind(self, neighborId)}>
          <SpotPreview key={idx} spotId={neighborId}/>
        </div>
      );
    });

    return <div className="container-fluid feature-box">
    <h3>Spots Nearby</h3>{result}</div>;
  },
  render: function(){
    return(
      <div className="container hello">
        <FavoriteButton id={this.state.user.favorites[0]}/>
        {this.home()}
        {this.favorites()}
        {this.neighbors()}
      </div>
      );
  }
});

module.exports = Hello;





