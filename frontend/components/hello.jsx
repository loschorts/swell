var React = require('react');

//Components
var HomeNavbar = require('./home_navbar');

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
  },
  updateUser: function(){
    this.setState({user: UserStore.currentUser()});
  },
  userInfo: function(){
		return( <div> 
              <h1> Hello, {this.state.user.username || "Stranger"} </h1>
              <h2> ID: {this.state.user.id} </h2>
              <h3> Favorites: {this.showFavorites()} </h3>
            </div>);
  },
  showFavorites: function(){
    return this.spotNames(this.state.user.favorites);
  },
  spotNames: function(array){
    if (array.length === 0){
      return [];
    }
    var names = [];
    array.forEach(function(spot){
      names.push(spot.name);
    });
    return names;
  },
  getAll: function(){
    this.setState({spots: []});
    SpotAPIUtil.getAllSpots();
  },
  getOne: function(){
    this.setState({spots: []});
    SpotAPIUtil.getSpotById(83);
    SpotStore.show(83);
  },
  render: function(){
    return(
    	<div id="hello"> 
	    	<HomeNavbar/>
        {this.userInfo()}
      </div>
    );
  }
});

module.exports = Hello;





