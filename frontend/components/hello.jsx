var React = require('react');

//Components
var SpotFocus = require('./spot_focus');
var SpotPreview = require('./spot_preview');

//Stores & Utils
var UserStore = require('../stores/user_store');
var UserAPIUtil = require('../util/user_api_util');
var SpotAPIUtil = require('../util/spot_api_util');

var Hello = React.createClass({

  // lifecycle methods
  getInitialState: function(){
    return({
      user: UserStore.nullUser()
    });
  },
  componentDidMount: function(){
    UserStore.addListener(this.updateUser);
    UserAPIUtil.fetchCurrentUser();
  },

  //listeners
  updateUser: function(){
    this.setState({
      user: UserStore.currentUser()
    });
  },

  //render
  render: function(){
    return(
      <div>
        {JSON.stringify(this.state.user)}
        {this.favorites()}
      </div>
      );
  },

  //render helpers

  favorites: function(){
    debugger
    return this.state.user.favorites.map(function(spotId){
      return <SpotFocus spotId={spotId}/>
    });
  }
});

module.exports = Hello;





