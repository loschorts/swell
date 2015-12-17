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
      spots: []
    });
  },
  componentDidMount: function(){
    UserStore.addListener(this.updateUser);
    SpotStore.addListener(this.updateSpots);
  },
  updateSpots: function(){
    this.setState({spots: SpotStore.all()});
  },
  updateUser: function(){
    this.setState({user: UserStore.currentUser()});
  },
  userName: function(){
  	if (this.state.user.username === null) {
  		return "stranger";
  	} else {
  		return this.state.user.username;
  	}
  },
  spotNames: function(){
    var names = [];
    this.state.spots.forEach(function(spot){
      names.push(spot.name);
    });
    return names;
  },
  render: function(){
    SpotAPIUtil.getAllSpots();
    return(
    	<div id="hello"> 
	    	<HomeNavbar/>
	    	{"Hello, " + this.userName()}
        <br/><br/>
        {"Spots: "+ this.spotNames()}
    	</div>
    );
  }
});

module.exports = Hello;





