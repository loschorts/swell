var React = require('react');

//Components
var HelloNavbar = require('./hello_navbar');
var SpotFocus = require('./spot_focus');
var SpotPreview = require('./spot_preview');

//Stores & Utils
window.UserStore = require('../stores/user_store');
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
    SpotStore.addListener(this.updateHome);
    UserAPIUtil.fetchCurrentUser();
  },
  updateUser: function(){
    console.log("updated user");
    this.setState({user: UserStore.currentUser()});
    SpotAPIUtil.fetchSpot(this.state.user.favorites[0]);
  },
  updateHome: function(){
    this.setState({home: SpotStore.getSpot(this.state.user.favorites[0])});
  },
  userInfo: function(){
    return <h3> Hello, {this.state.user.username} </h3>;
  },
  redirectForecast: function(id){
    this.props.history.push('/forecast/'+id);
  },
  home: function(){
    if (typeof this.state.home === 'undefined') {
      return;
    }
    return (
        <div onClick={this.redirectForecast.bind(this, this.state.home.id)}>
          <h1>Home</h1>
          <SpotFocus spotId={this.state.home.id}/>
        </div>
    );
  },
  favorites: function(){
    if (this.state.user.favorites.length < 2) {
      return;
    }
    var favs = this.state.user.favorites.slice(1);

    var els = favs.map(function(spot_id, idx){
      return <div className="col-md-4"><SpotPreview key={idx} spotId={spot_id}/></div>
    });
    return <div className="container-fluid feature-box"><h3>Favorites</h3>{els}</div>;
  },
  neighbors: function(){
    if (typeof this.state.home === 'undefined'){ 
      return;
    }

    var result = this.state.home.neighbors.map(function(neighborId, idx){
      return <div className="col-md-4"><SpotPreview key={idx} spotId={neighborId}/></div>;
    });

    return <div className="container-fluid feature-box"><h3>Spots Nearby</h3>{result}</div>;
  },
  render: function(){
    return(
      <div className="container hello">
        <HelloNavbar history={this.props.history}/>
        {this.home()}
        {this.favorites()}
        {this.neighbors()}
      </div>
      );
  }
});

module.exports = Hello;





